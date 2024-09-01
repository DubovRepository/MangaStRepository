package com.example.mangast.controllers;

import com.example.mangast.forgotPassword.ForgotPasswordRequest;
import com.example.mangast.forgotPassword.ForgotPasswordService;
import com.example.mangast.forgotPassword.NewPasswordRequest;
import com.example.mangast.request.AuthenticationRequest;
import com.example.mangast.request.ChangePasswordRequest;
import com.example.mangast.request.RegisterRequest;
import com.example.mangast.response.AuthenticationResponse;
import com.example.mangast.response.RegisterResponse;
import com.example.mangast.services.AuthenticationService;
import com.example.mangast.services.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthenticationController {
    private final AuthenticationService service;
    private final UserService userService;
    private final ForgotPasswordService forgotPasswordService;

    @PostMapping("/register")
    //@ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<RegisterResponse> register(@RequestBody @Valid RegisterRequest request)
    throws MessagingException
    {
        //var response = service.register(request);
        //return ResponseEntity.ok(response);

        return ResponseEntity.ok(service.newRegister(request));
    }

    @PostMapping("/activate-account")
    public ResponseEntity<AuthenticationResponse> confirm(@RequestBody RegisterRequest request) throws MessagingException {
        return ResponseEntity.ok(service.activateAccount(request));
    }


    @PostMapping("/check-availability-account")
    public ResponseEntity<RegisterResponse> check(@RequestBody @Valid ForgotPasswordRequest request) throws MessagingException {
        return ResponseEntity.ok(forgotPasswordService.isExistAccount(request));
    }

    @PostMapping("/new-password-account")
    public ResponseEntity<AuthenticationResponse> recoverAccount(@RequestBody @Valid NewPasswordRequest request) {
        return ResponseEntity.ok(forgotPasswordService.recoverAccountPassword(request));
    }



    @PostMapping("/authenticate")
    //@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid AuthenticationRequest request) throws MessagingException {
        //return ResponseEntity.ok(service.authenticate(request));
        return ResponseEntity.ok(service.newAuthenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refresh_token(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request,response);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connectUser) {
        userService.changePassword(request, connectUser);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/logout")
    public void logout(@RequestBody String accessToken) {
        service.logoutAccount(accessToken);
    }

}
