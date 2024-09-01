package com.example.mangast.manga.categories;

import com.example.mangast.manga.MangaRepository;
import com.example.mangast.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriesService {
    private final CategoriesRepository repository;
    private final MangaRepository mangaRepository;


    public List<Category> loadAllMangaCategories() {
        return repository.findAll();
    }

    public List<Category> findCategoriesByMangaId(Integer mangaId) {
        return mangaRepository.findAllCategoriesByMangaId(mangaId);
    }
}
