package com.example.mangast.user;

import com.example.mangast.user.role.Role;
import lombok.*;

import java.time.LocalDate;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Integer id;

    private String email;

    private String password;

    private String nickname;

    private Role role;

    private String userPageId;

    private boolean isBanned;

    private boolean isActivated;

    private String firstname;

    private String lastname;

    private String aboutYou;

    private LocalDate birthday;

    private byte[] userCover;




}
