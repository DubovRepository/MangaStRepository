package com.example.mangast.feedback;

import com.example.mangast.manga.Manga;
import com.example.mangast.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    @Query("""
    SELECT AVG(fb.rate) FROM Feedback fb
    WHERE fb.manga.id = :currentManga
    """)
    float getAverageByManga(Manga currentManga);

    @Query("""
    SELECT fb FROM Feedback fb
    WHERE fb.manga.id = :mangaId
    AND fb.user = :currentUser
    """)
    Feedback checkAlreadyExistsFeedback(Integer mangaId, User currentUser);
}
