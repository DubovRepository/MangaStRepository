package com.example.mangast.manga;

import com.example.mangast.manga.categories.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface MangaRepository extends JpaRepository<Manga, Integer>, JpaSpecificationExecutor<Manga> {

    @Query("""
    SELECT manga FROM Manga manga
    WHERE manga.achieved = false
    AND manga.verified = true 
    """)
    Page<Manga> findAllAvailableManga(Pageable pageable);


    @Query("""
    SELECT manga FROM Manga manga 
    WHERE manga.verified = true 
    AND manga.title ILIKE %:title%
    """)
    Page<Manga> findAllByTitleContaining(String title, Pageable pageable);


    Optional<Manga> findByMangaPageId(String pageId);

    @Query("""
    SELECT manga.category FROM Manga manga
    WHERE manga.id = :mangaId
    """)
    List<Category> findAllCategoriesByMangaId(Integer mangaId);


}
