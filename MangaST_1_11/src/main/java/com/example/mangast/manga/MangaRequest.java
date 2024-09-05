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
public class MangaRequest {
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        private String title;

        @NotNull(message = "101")
        @NotEmpty(message = "101")
        private String authorName;


        private TypeManga typeManga;

        @NotNull(message = "102")
        @NotEmpty(message = "102")
        private String description;

        @NotNull(message = "103")
        @Size(min = 1, message = "Choice at least one category")
        private List<Category> mangaCategories;

        private MangaStatus status;

}
