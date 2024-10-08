package com.example.mangast.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class SmallUserResponse {

    private Integer id;
    private String nickname;
    private String userPageId;
    private byte[] userCover;
}
