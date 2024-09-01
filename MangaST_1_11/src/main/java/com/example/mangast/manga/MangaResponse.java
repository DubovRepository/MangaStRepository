package com.example.mangast.manga;

import com.example.mangast.manga.categories.MangaCategories;
import lombok.*;

import java.util.Set;

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

    //@Enumerated(EnumType.STRING)
    private TypeManga typeManga;

    private MangaStatus status;

    //@Enumerated(EnumType.STRING)
    //private Set<MangaCategories> categories;

    private String description;


}
