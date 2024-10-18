package com.example.mangast.comments;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CommentResponse {

    private Integer id;

    private String message;

    private Integer userId;

    private String nickname;

    private String userPageId;

    private byte[] userCover;

}
