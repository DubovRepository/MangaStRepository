package com.example.mangast.manga.chapters;

import com.example.mangast.manga.Manga;
import com.example.mangast.user.User;

import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChapterResponse {
    private Integer id;

    private float number;

    private String title;

    private byte[] content;

    private String mangaPageId;

    //private Manga manga;

    //private User translator;

}
