package com.example.mangast.manga;

import com.example.mangast.manga.categories.Category;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class UpdateMangaRequest {
    private Integer id;

    @NotNull
    @NotEmpty
    @Size(min = 8, message = "Title should be 8 characters long minimum")
    private String title;

    @NotNull
    @NotEmpty
    @Size(min = 8, message = "Title should be 8 characters long minimum")
    private String authorName;


    private TypeManga typeManga;

    private MangaStatus status;

    @NotNull
    @NotEmpty
    @Size(min = 30, message = "The description is too short")
    private String description;

    @NotNull
    @Size(min = 1, message = "Choice at least one category")
    private List<Category> categoryList;
}
