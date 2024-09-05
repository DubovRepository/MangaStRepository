package com.example.mangast.manga;

import lombok.*;


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


}
