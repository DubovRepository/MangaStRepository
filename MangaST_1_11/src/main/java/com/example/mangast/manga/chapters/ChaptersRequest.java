package com.example.mangast.manga.chapters;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Builder
@Setter
public class ChaptersRequest {

    @NotNull(message = "manga id cannot be null")
    @NotEmpty(message = "manga id cannot be null")
    private Integer mangaId;

    @NotEmpty(message = "White the chapter number")
    private float numberChapter;


    @NotNull(message = "Title cannot be null")
    @NotEmpty(message = "Title cannot be empty")
    @Size(min = 3, message = "Title should be 3 characters long minimum!")
    private String chapterTitle;


}
