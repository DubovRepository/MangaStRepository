package com.example.mangast.manga;

import com.example.mangast.comments.Comment;
import com.example.mangast.comments.CommentResponse;
import com.example.mangast.manga.categories.Category;
import lombok.*;

import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MangaResponse {

    private Integer id;

    private String title;

    private String authorName;

    private byte[] mangaCover;

    private boolean achieved;

    private String mangaPageId;

    private String pathTitle;

    private TypeManga typeManga;

    private MangaStatus status;

    private String description;

    private Double rating;

    private List<Category> categoryList;

    private List<CommentResponse> comments;


}
