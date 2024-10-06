package com.example.mangast.comments;

import com.example.mangast.manga.Manga;
import com.example.mangast.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query("""
    SELECT comment FROM Comment comment
    WHERE comment.manga = :currentManga
    """)
    List<Comment> findAllByManga(Manga currentManga);

    @Query("""
    SELECT comment FROM Comment comment
    WHERE comment.manga = :manga AND comment.user = :user
    ORDER BY comment.createdDate DESC
    LIMIT 1
    """)
    Optional<Comment> findPreviousCommentByUser(Manga manga, User user);
}
