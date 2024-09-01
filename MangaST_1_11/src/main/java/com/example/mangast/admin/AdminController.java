package com.example.mangast.admin;


import com.example.mangast.admin.AdminService;
import com.example.mangast.manga.MangaRequest;
import com.example.mangast.manga.MangaResponse;
import com.example.mangast.manga.UpdateMangaRequest;
import com.example.mangast.manga.chapters.ChapterResponse;
import com.example.mangast.page.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;


    //Добавление новой манги
    @PostMapping(value = "/add")
    public ResponseEntity<Integer> addManga(
            @RequestBody @Valid MangaRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(adminService.save(request, connectedUser));
    }

    //Обновление манги
    @PostMapping("/update")
    public ResponseEntity<Integer> updateManga(
            @RequestBody @Valid UpdateMangaRequest request,
            //@Parameter
            //@RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(adminService.update(request, connectedUser));
    }

    //Загрузка изображения для манги
    @PostMapping(value = "/loadMangaCover/{mangaId}", consumes = "multipart/form-data")
    public ResponseEntity<?> loadCover(
            @PathVariable("mangaId") Integer mangaId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser) {
        adminService.loadCoverByManga(mangaId, file, connectedUser);
        return ResponseEntity.accepted().build();
    }


    //Удаление манги
    @DeleteMapping("/delete/{manga-id}")
    public void deleteMangaById(
            @PathVariable("manga-id") Integer id,
            Authentication connectedUser
    ) {
        adminService.deleteMangaById(id, connectedUser);
    }

    //Поиск всех произведений (манга/манхва) у которых есть непроверенные запросы
    @PostMapping("/check/findAllMangaWithUnverifiedChapters")
    public ResponseEntity<PageResponse<MangaResponse>> findAllMangaWithUnverifiedChapters(
            Authentication connectedUser,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size
    ) {
        return ResponseEntity.ok(adminService.findAllMangaWithUnverifiedChapters(page, size, connectedUser));
    }

    //Поиск произведений с непроверенными запросами содержащих в своем названии {mangaTitle}
    @PostMapping("/check/findMangaWithUnverifiedChaptersByTitle/{mangaTitle}")
    public ResponseEntity<PageResponse<MangaResponse>> findMangaWithUnvChaptersByTitle(
            Authentication connectedUser,
            @PathVariable("mangaTitle") String title,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size
    ) {
        return ResponseEntity.ok(adminService.findMangaWithUnverifiedChaptersByTitle(title, page, size, connectedUser));
    }

    //Поиск всех непроверенных запросов (глав) по manga id
    @PostMapping("/check/findAllUnverifiedChaptersByMangaId/{mangaId}")
    public ResponseEntity<List<ChapterResponse>> findUnverifiedChaptersByMangaId(
            Authentication connectedUser,
            @PathVariable("mangaId") Integer mangaId
    ) {
        return ResponseEntity.ok(adminService.findUnverifiedChaptersByManga(connectedUser, mangaId));
    }

    //Удаление (отказ) непровернной главы.
    @PostMapping("/check/deleteUntrustedChapterById/{chapterId}")
    public ResponseEntity<?> deleteUntrustedChapter(
            Authentication connectedUser,
            @PathVariable("chapterId") Integer chapterId) {
        adminService.deleteUntrustedChapter(chapterId, connectedUser);
        return ResponseEntity.accepted().build();
    }

    //Одобрение новой главы
    @PostMapping("/check/approveChapterById/{chapterId}")
    public ResponseEntity<?> setTrustChapter(
            Authentication connectedUser,
            @PathVariable("chapterId") Integer chapterId) {
        adminService.approveTrustChapter(chapterId, connectedUser);
        return ResponseEntity.accepted().build();
    }

    //Поиск определенной непроверенной главы (запрос) по mangaPageId и chapterId
    @PostMapping("/check/findUnverifiedChapterById/{mangaPageId}/{chapterId}")
    public ResponseEntity<ChapterResponse> findUnverifiedChapterByMangaPageIdAndChapterId(
            Authentication connectedUser,
            @PathVariable("chapterId") Integer chapterId,
            @PathVariable("mangaPageId") String pageId
    ) {
        return ResponseEntity.ok(adminService.findUnverifiedChapterByPageIdAndChapterId(connectedUser,pageId, chapterId));
    }
}
