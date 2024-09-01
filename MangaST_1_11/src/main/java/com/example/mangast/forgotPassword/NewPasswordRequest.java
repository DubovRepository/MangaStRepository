package com.example.mangast.forgotPassword;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class NewPasswordRequest {
    @Email
    @NotEmpty(message = "email is mandatory")
    @NotNull(message = "email is mandatory")
    private String email;

    @NotNull(message = "Password is mandatory")
    @NotEmpty(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be 8 characters long minimum")
    private String newPassword;


    @NotNull(message = "Confirm password is mandatory")
    @NotEmpty(message = "Confirm password is mandatory")
    @Size(min = 8, message = "Confirm password should be 8 characters long minimum")
    private String confirmNewPassword;
}
