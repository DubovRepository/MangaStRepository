package com.example.mangast.request;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
public class RegisterRequest {

    @Email
    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    private String email;

    @NotEmpty(message = "Nickname is mandatory")
    @NotNull(message = "Nickname is mandatory")
    private String nickname;

    @NotEmpty(message = "Password is mandatory")
    @NotNull(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be 8 characters long minimum")
    private String password;

    @NotEmpty(message = "Confirm password is mandatory")
    @NotNull(message = "Confirm password is mandatory")
    @Size(min = 8, message = "Confirm password should be 8 characters long minimum")
    private String confirmPassword;
}
