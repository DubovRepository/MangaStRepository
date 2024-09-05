package com.example.mangast.forgotPassword;

import com.example.mangast.exceptions.PersonalUserException;
import com.example.mangast.response.AuthenticationResponse;
import com.example.mangast.response.RegisterResponse;
import com.example.mangast.services.AuthenticationService;
import com.example.mangast.services.JwtService;
import com.example.mangast.user.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {
    private final UserRepository userRepository;
    private final AuthenticationService authService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public RegisterResponse isExistAccount(ForgotPasswordRequest request) throws MessagingException {
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User is not exist!"));

        var code = authService.sendRecoverAccount(request.getEmail());

        return RegisterResponse.builder()
                .code(code)
                .build();
    }


    public AuthenticationResponse recoverAccountPassword(NewPasswordRequest request) {
        if(!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new PersonalUserException("Passwords not matches!");
        }

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found!"));

        if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new PersonalUserException("New password should be tell apart of currently password");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        var newUser = userRepository.save(user);

//        var auth = manager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        newUser.getEmail(),
//                        passwordEncoder.encode(newUser.getPassword())
//                )
//        );

        var claims = new HashMap<String, Object>();
        //var jwtToken = jwtService.generateToken(claims, (User) auth.getPrincipal());
        var jwtToken = jwtService.generateToken(claims, newUser);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();


    }
}
