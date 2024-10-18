package com.example.mangast.rating;

import com.example.mangast.manga.Manga;
import com.example.mangast.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RatingRepository extends JpaRepository<Rating, Integer> {

    @Query("""
    SELECT AVG(fb.rate) FROM Rating fb
    WHERE fb.manga.id = :currentManga
    """)
    double getAverageByManga(Manga currentManga);

    @Query("""
    SELECT fb FROM Rating fb
    WHERE fb.manga.id = :mangaId
    AND fb.user = :currentUser
    """)
    Rating checkAlreadyExistsRating(Integer mangaId, User currentUser);
}
