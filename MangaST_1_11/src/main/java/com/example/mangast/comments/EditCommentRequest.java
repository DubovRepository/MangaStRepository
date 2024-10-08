package com.example.mangast.comments;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class EditCommentRequest {

    private Integer commentId;

    private String editContent;

}
