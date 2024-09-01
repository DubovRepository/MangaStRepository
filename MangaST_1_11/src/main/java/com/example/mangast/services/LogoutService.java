package com.example.mangast.services;

import com.example.mangast.user.User;
import com.example.mangast.user.token.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final TokenRepository repository;


    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.info("Not found token");
            return;
        }



        /*
        var expiredTokens = repository.findAllValidTokensByUser(user.getId());


        expiredTokens.stream()
                .map(token -> {
                    token.setRevoked(true);
                    token.setExpiredToken(true);
                    return token;
                });
        repository.saveAll(expiredTokens);
        */


        jwtToken = authHeader.substring(7);
        log.info("JWT token: " + jwtToken);

        var storedToken = repository.findByToken(jwtToken).orElse(null);

        if(storedToken != null) {
            storedToken.setExpiredToken(true);
            storedToken.setRevoked(true);
            repository.save(storedToken);
        }
    }
}
