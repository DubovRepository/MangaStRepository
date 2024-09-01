package com.example.mangast.services;

import com.example.mangast.request.RegisterRequest;
import com.example.mangast.user.User;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImp {
    private final JavaMailSender emailSender;
    @Value("${spring.mail.username}")
    private String sendFrom;

    public void sendConfirmMessage(
            RegisterRequest request, String code
    ) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(sendFrom);
            mimeMessageHelper.setTo(request.getEmail());
            mimeMessageHelper.setCc(sendFrom);
            mimeMessageHelper.setSubject("Confirm account by MangaSt");
            mimeMessageHelper.setText("Enter this code for confirm your account: " + code);

            //mimeMessageHelper.addAttachment(file.getOriginalFilename(), new ByteArrayResource(file.getBytes()));

            emailSender.send(mimeMessage);
            log.info("Message sending!");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Async
    public void sendValidMessage(
           String email, String fullName, String newToken
    ) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(sendFrom);
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setCc(sendFrom);
            mimeMessageHelper.setSubject("Confirm account by MangaSt");
            mimeMessageHelper.setText("Hi " + fullName + "! Please enter this code for confirm your account: " + newToken);

            //mimeMessageHelper.addAttachment(file.getOriginalFilename(), new ByteArrayResource(file.getBytes()));

            emailSender.send(mimeMessage);
            log.info("Message sending!");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @Async
    public void sendRecoverMessage(
            String email, String fullName, String newToken
    ) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(sendFrom);
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setCc(sendFrom);
            mimeMessageHelper.setSubject("Recover account by MangaSt");
            mimeMessageHelper.setText("Hi " + fullName + "! Please enter this code for recover your account: " + newToken);

            //mimeMessageHelper.addAttachment(file.getOriginalFilename(), new ByteArrayResource(file.getBytes()));

            emailSender.send(mimeMessage);
            log.info("Message sending!");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
