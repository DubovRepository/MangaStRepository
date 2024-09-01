package com.example.mangast.forgotPassword;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor //Если уберу вылезет ошибка с десерилизацией JSON объекта
@AllArgsConstructor //Если уберу вылезет ошибка с десерилизацией JSON объекта
@Builder
public class ForgotPasswordRequest {

    @Email
    @NotEmpty(message = "email is mandatory")
    @NotNull(message = "email is mandatory")
    private String email;
}
