package com.example.mangast.manga.chapters;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("chapters")
@RequiredArgsConstructor
public class ChapterController {
    private final MangaChapterService service;


    //Все главы по mangaId магши
    @PostMapping("/findAllChapters/{mangaId}")
    public ResponseEntity<List<ChapterResponse>> findAllChaptersByMangaId(@PathVariable("mangaId") Integer mangaId) {
        return ResponseEntity.ok(service.findAllChaptersByMangaId(mangaId));
    }

    //Все главы по pageId манги
    @PostMapping("/findAllChaptersByPageId/{pageId}")
    public ResponseEntity<List<ChapterResponse>> findAllChaptersByPageId(@PathVariable("pageId") String mangaPageId) {
        return ResponseEntity.ok(service.findAllChapterByMangaPageId(mangaPageId));
    }

    //Нахождение верифицированной главы по pageId и chapterNumber
    @PostMapping("/findChapter/{pageId}/{chapterNumber}")
    public ResponseEntity<ChapterResponse> findChapterByNumberAndMangaPageId(
            @PathVariable("pageId") String mangaPageId,
            @PathVariable("chapterNumber") float chapterNumber) {
        return ResponseEntity.ok(service.findCurrentChapter(mangaPageId, chapterNumber));
    }

    //Добавление главы
    @PostMapping("/addRequestChapter")
    public ResponseEntity<Integer> addChap(
            Authentication connectedUser,
            @RequestBody ChaptersRequest request) {
        return ResponseEntity.ok(service.addUnverifiedChapter(connectedUser,request));
    }

    //Загрузка pdf файла
    @PostMapping(value = "/loadPdfFile/{mangaId}/{chapterId}", consumes = "multipart/form-data")
    public ResponseEntity<?> loadPdfChap(
            Authentication connectedUser,
            @Parameter
            @RequestPart(name = "file") MultipartFile file,
            @PathVariable("mangaId") Integer mangaId,
            @PathVariable("chapterId") Integer chapterId
            ) {
        service.saveChapterPdf(connectedUser, mangaId, chapterId, file);
        return ResponseEntity.accepted().build();
    }

}
