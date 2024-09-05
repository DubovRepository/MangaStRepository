package com.example.mangast.services;

import com.example.mangast.exceptions.PersonalUserException;
import com.example.mangast.request.AuthenticationRequest;
import com.example.mangast.request.RegisterRequest;
import com.example.mangast.response.AuthenticationResponse;
import com.example.mangast.response.RegisterResponse;
import com.example.mangast.user.User;
import com.example.mangast.user.UserRepository;
import com.example.mangast.user.token.Token;
import com.example.mangast.user.token.TokenRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.AuthenticationFailedException;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.HashMap;

import static com.example.mangast.user.role.Role.*;
import static com.example.mangast.user.token.TokenType.BEARER;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager manager;
    private final TokenRepository tokenRepository;
    private final EmailServiceImp emailService;


    @Transactional
    public AuthenticationResponse newAuthenticate(AuthenticationRequest request) throws MessagingException {
        var auth = manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(()-> new UsernameNotFoundException("User with this email not exist!"));


        if(user.isBanned()) {
            throw new AuthenticationFailedException("Your account was banned!");
        }


        //claims.put("fullName", user.getFullName()); !!!!!!!!!!!!!!
        String jwtToken = "";
        if(request.isRemember()) {
             jwtToken = jwtService.generateLongToken(claims, (User) auth.getPrincipal());
        } else if (!request.isRemember()) {
            jwtToken = jwtService.generateToken(claims, (User) auth.getPrincipal());
        }

        revokeAllUsersTokens(user);
        saveUserToken(user, jwtToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }


    public RegisterResponse newRegister(RegisterRequest request) throws MessagingException {

        var tempUser = userRepository.findByEmail(request.getEmail());
        if(tempUser.isPresent()) {
            throw new PersonalUserException("User with this email already exist!");
        }

        var tempNickname = userRepository.findByNickname(request.getNickname());
        if (tempNickname.isPresent()) {
            throw new PersonalUserException("User with this nickname already exist!");
        }

        if(!request.getPassword().equals(request.getConfirmPassword())) {
            throw new PersonalUserException("Passwords not matches!");
        }
        var code = sendValidEmail(request.getEmail());

        return RegisterResponse
                .builder()
                .code(code)
                .build();
    }


    @Transactional
    public AuthenticationResponse activateAccount(RegisterRequest request) throws MessagingException {
        var pageId = generateUserPageId(10);

        var user = User.builder()
                .email(request.getEmail())
                .nickname(request.getNickname())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(USER)
                .userPageId(pageId)
                .isActivated(true)
                .isBanned(false)
                .build();
        userRepository.save(user);


        //var auth =
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        //var jwtToken = jwtService.generateToken(claims, (User) auth.getPrincipal());
        var jwtToken = jwtService.generateToken(claims, user);

        saveUserToken(user, jwtToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();

    }

    public void logoutAccount(String token) {
        var jwtToken = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Incorrect token!"));

        if (jwtToken.isRevoked() && jwtToken.isExpiredToken()) {
            log.info("Token is already expired or revoked!");
            return;
        }

        jwtToken.setRevoked(true);
        jwtToken.setExpiredToken(true);
        tokenRepository.save(jwtToken);
    }




    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder() //Сохраняем токен в бд
                .user(user)
                .token(jwtToken)
                .tokenType(BEARER)
                .expiredToken(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }


    private void revokeAllUsersTokens(User user) {

        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(t-> {
            t.setExpiredToken(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }


    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if(header == null || !header.startsWith("Bearer ")) {
            return;
        }
        refreshToken = header.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if(userEmail != null) { //Тут нам не надо проверять пользователя второй раз на аунтификацию, т.к есть JwtAuthenticationFilter
            var user = this.userRepository.findByEmail(userEmail).orElseThrow();
            //В отличии от JWtAuthenticationFilter нам не требуется проверять TokenIsValid т.к мы обновляем токен
            if(jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                revokeAllUsersTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        //.refreshToken(refreshToken)  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }


        }

    }


    private String generateActivationCode(int length) {
        return generateCode(length);
    }

    private String generateUserPageId(int length) {
        return generateCode(length);
    }


    public String sendValidEmail(String email) throws MessagingException {
        String confirmToken = generateActivationCode(6);
        emailService.sendValidMessage(email, email, confirmToken);
        return confirmToken;
    }

    public String sendRecoverAccount(String email) throws MessagingException {
        String confirmToken = generateActivationCode(6);
        emailService.sendRecoverMessage(email, email, confirmToken);
        return confirmToken;
    }

    private String generateCode(int n) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for(int i = 0; i < n; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

}
