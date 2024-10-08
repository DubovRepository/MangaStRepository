package com.example.mangast.comments;

import com.example.mangast.user.SmallUserResponse;
import com.example.mangast.user.UserResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CommentResponse {

    private Integer id;

    private String message;

    private SmallUserResponse user;

}
