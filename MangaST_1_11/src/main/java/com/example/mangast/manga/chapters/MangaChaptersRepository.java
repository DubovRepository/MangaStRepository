package com.example.mangast.manga.chapters;

import com.example.mangast.manga.Manga;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MangaChaptersRepository extends JpaRepository<MangaChapters, Integer> {

    @Query("""
        SELECT chapters.manga FROM MangaChapters chapters
        WHERE chapters.verified = false
        
    """)
    Page<Manga> findAllMangaWithUnverifiedChapters(Pageable pageable);



    @Query("""
        SELECT chapters.manga FROM MangaChapters chapters
        WHERE chapters.verified = false AND chapters.manga.title ILIKE %:title%
    """)
    Page<Manga> findMangaWithUnverifiedChaptersByTitle(String title, Pageable pageable);



    @Query("""
        SELECT chapters FROM MangaChapters chapters
        WHERE chapters.manga = :manga AND chapters.verified = false
    """)
    List<MangaChapters> findAllUnverifiedChaptersByManga(Manga manga);



    //Возможно везде где стоит Manga manga придется сделать поиск по manga_id тоесть Integer
    @Query("""
        SELECT chapters FROM MangaChapters chapters
        WHERE chapters.manga = :manga AND chapters.verified = true
        ORDER BY chapters.number
    """)
    List<MangaChapters> findAllVerifiedChaptersByManga(Manga manga);



    @Query("""
        SELECT chapters FROM MangaChapters chapters
        WHERE chapters.manga = :manga AND chapters.number = :chapterNumber 
        AND chapters.verified = true
    """)
    Optional<MangaChapters> checkForExistenceChapterWithNumber(Manga manga, float chapterNumber);



    @Query("""
        SELECT chapter FROM MangaChapters chapter
        WHERE chapter.verified = false AND chapter.id = :chapterId
    """)
    Optional<MangaChapters> findUnverifiedChapterById(Integer chapterId);



    @Query("""
        DELETE FROM MangaChapters 
        WHERE verified = false AND number = :chapNumber
        AND manga = :chapManga
    """)
    void deleteDuplicatesUnverifiedChapterNumber(float chapNumber, Manga chapManga);

}
