package com.example.mangast.services;


import com.example.mangast.request.RegisterRequest;
import com.example.mangast.response.VerificationResponse;
import com.example.mangast.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class VerificationService {
    private final UserRepository userRepository;
    private final EmailServiceImp emailService;

    public String checkAvailabilityAccount(RegisterRequest request) {
        if(!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalStateException("The entered passwords don`t match!");
        }
        var tempUser = userRepository.findByEmail(request.getEmail());
        if(tempUser.isPresent()) {
            throw new IllegalStateException("User with this email already exists!");
        }

        var checkNickname = userRepository.findByNickname(request.getNickname());
        if (checkNickname.isPresent()) {
            // ПОМЕНЯТЬ ОШИБКУ, Добавить другую кастомную!!!!
            throw new IllegalStateException("User with this nickname already exist!");
        }
        String code = generateSecretCode();
        emailService.sendConfirmMessage(request, code);
        return code;
    }

    public VerificationResponse testCheckAccount(RegisterRequest request) {
        if(!request.getPassword().equals(request.getConfirmPassword())) {
            return VerificationResponse.builder()
                    .code(null)
                    .error("The entered passwords don`t match!").build();
        }
        var tempUser = userRepository.findByEmail(request.getEmail());
        if(tempUser.isPresent()) {
            return VerificationResponse.builder()
                    .code(null)
                    .error("User with this email already exists!")
                    .build();
        }

        var checkNickname = userRepository.findByNickname(request.getNickname());
        if (checkNickname.isPresent()) {
            // ПОМЕНЯТЬ ОШИБКУ, Добавить другую кастомную!!!!
            return VerificationResponse.builder()
                    .code(null)
                    .error("User with this nickname already exist!")
                    .build();
        }
        String code = generateSecretCode();
        emailService.sendConfirmMessage(request, code);
        return VerificationResponse.builder()
                .code(code)
                .error(null)
                .build();
    }


    public String generateSecretCode() {
        String temp = "";
        Random random = new Random();
        for(int i = 0; i < 8; i++) {
            temp += random.nextInt(0,9);
        }
        System.out.println(temp);
        return temp;

    }
}
