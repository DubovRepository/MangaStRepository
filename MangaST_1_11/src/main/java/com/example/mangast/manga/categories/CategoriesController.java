package com.example.mangast.manga.categories;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Categories")
@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoriesController {

    private final CategoriesService service;


    @GetMapping("/getAllCategories")
    public ResponseEntity<List<Category>> findAllMangaCategories() {
        return ResponseEntity.ok(service.loadAllMangaCategories());
    }


    @GetMapping("/findCategoriesByManga")
    public ResponseEntity<List<Category>> findCategoriesByMangaId(
            Integer mangaId
    ) {
        return ResponseEntity.ok(service.findCategoriesByMangaId(mangaId));
    }
}
