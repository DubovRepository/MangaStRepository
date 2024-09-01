package com.example.mangast.mapper;

import com.example.mangast.file.FileUtils;
import com.example.mangast.manga.Manga;
import com.example.mangast.manga.MangaResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public class MangaMapper {

    public static List<MangaResponse> toMangaResponseList(Page<Manga> mangaList) {
        return mangaList.stream().map((manga) -> {
            return MangaResponse.builder()
                    .id(manga.getId())
                    .mangaCover(FileUtils.readFileFromLocation(manga.getMangaCover()))
                    .typeManga(manga.getTypeManga())
                    .title(manga.getTitle())
                    .description(manga.getDescription())
                    .pathTitle(manga.getPathTitle())
                    .achieved(manga.isAchieved())
                    .authorName(manga.getAuthorName())
                    .mangaPageId(manga.getMangaPageId())
                    .status(manga.getStatus())
                    .build();
        }).toList();
    }
}
