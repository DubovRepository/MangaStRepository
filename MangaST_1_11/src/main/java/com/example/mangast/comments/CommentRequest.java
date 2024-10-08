package com.example.mangast.comments;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CommentRequest {

    private Integer mangaId;

    private String content;
}
