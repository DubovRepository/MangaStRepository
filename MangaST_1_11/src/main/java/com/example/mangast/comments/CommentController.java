package com.example.mangast.comments;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService service;

    //to all
    @GetMapping("/getComments/{mangaId}")
    public ResponseEntity<List<CommentResponse>> getAllCommentsByManga(@PathVariable("mangaId") Integer mangaId) {
        return ResponseEntity.ok(service.getComments(mangaId));
    }

    //to user
    @PostMapping("/addComment")
    public ResponseEntity<?> addComment(Authentication connectedUser,
                                        @RequestBody CommentRequest request) {
        service.addComment(connectedUser, request);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<?> deleteComment(Authentication connectedUser,
                                           @PathVariable("commentId") Integer commentId) {
        service.deleteCommentById(connectedUser, commentId);
        return ResponseEntity.accepted().build();
    }

    @PatchMapping("/editComment")
    public ResponseEntity<?> updateComment(Authentication connectedUser,
                                           @RequestBody EditCommentRequest request) {
        service.editComment(connectedUser, request);
        return ResponseEntity.accepted().build();
    }



}
