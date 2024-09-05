package com.example.mangast.manga.chapters;


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


}
