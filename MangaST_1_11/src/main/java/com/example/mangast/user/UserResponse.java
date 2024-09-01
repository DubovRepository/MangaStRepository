package com.example.mangast.user;

import com.example.mangast.manga.Manga;
import com.example.mangast.manga.MangaResponse;
import com.example.mangast.page.PageResponse;
import com.example.mangast.user.role.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

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

    private String aboutYou; //Описание о себе

    private LocalDate birthday;

    private byte[] userCover;

    //private PageResponse<MangaResponse> favoritePageList;


}
