package com.example.mangast.manga;

import com.example.mangast.manga.categories.Category;
import com.example.mangast.manga.categories.MangaCategories;
import com.example.mangast.page.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/mangaList")
@RequiredArgsConstructor
public class MangaController {
    private final MangaService service;


    //Под удаление + из SecurityConfig тоже убрать
    //!=================================
    @GetMapping("/allCategories")
    public ResponseEntity<List<MangaCategories>> findAllCategories() {
        return ResponseEntity.ok(service.loadAllCategories());
    }

    //Поиск манги по mangaPageId
    @GetMapping("/find/{mangaPageId}")
    public ResponseEntity<MangaResponse> findMangaByPageId(@PathVariable String mangaPageId, Authentication connectedUser) {
        return ResponseEntity.ok(service.findByPageId(mangaPageId, connectedUser));
    }


    //Поиск всех манг содержащих в названии это: {title}
    @GetMapping("/find/findTitle/{title}")
    public ResponseEntity<PageResponse<MangaResponse>> findByTitle(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @PathVariable String title) {
        return ResponseEntity.ok(service.findByTitle(page, size, title));
    }

    //Достаем все имеющие манга статусы
    @GetMapping("/find/findAllMangaStatus")
    public ResponseEntity<List<MangaStatus>> findAllStatus() {
        return ResponseEntity.ok(service.findAllMangaStatus());
    }


    //List manga
    @GetMapping("/find/findAllManga")
    public ResponseEntity<PageResponse<MangaResponse>> findAllManga(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size
    ) {

        return ResponseEntity.ok(service.findAllManga(page, size));
    }


    //List favorite manga
    @GetMapping("/favorite")
    public ResponseEntity<PageResponse<MangaResponse>> findAllFavoriteMangaByUser(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {

        return ResponseEntity.ok(service.findFavoriteManga(page,size,connectedUser));
    }



    //Добавляем мангу в favorite list
    @PostMapping("/addToFavorite/{manga-id}")
    public void addToFavorite(
            @PathVariable("manga-id") Integer mangaId,
            Authentication connectedUser
    ) {
        service.addToFavorite(mangaId, connectedUser);
    }


    //Удаление манги из favorite list
    @DeleteMapping("/deleteFromFavorite/{manga-id}")
    public void deleteFromFavorite(
            @PathVariable("manga-id") Integer mangaId,
            Authentication connectedUser
    ) {
        service.deleteFromFavoriteByMangaId(mangaId, connectedUser);

    }
}
