package com.example.mangast.feedback;

import com.example.mangast.manga.Manga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    @Query("""
    SELECT AVG(fb.rate) FROM Feedback fb
    WHERE fb.manga.id = :currentManga
    """)
    float getAverageByManga(Manga currentManga);
}
