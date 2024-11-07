package com.example.mangast.comments;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Builder
@Getter
@Setter
public class CommentRequest {

    @NotNull
    private Integer mangaId;

    @NotNull
    @NotEmpty
    @Length(min = 5, max = 1000)
    private String content;
}
