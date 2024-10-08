package com.example.mangast.comments;

import com.example.mangast.file.FileUtils;
import com.example.mangast.manga.MangaRepository;
import com.example.mangast.user.SmallUserResponse;
import com.example.mangast.user.User;
import com.example.mangast.user.role.Role;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository repository;
    private final MangaRepository mangaRepository;

    //get all comment by manga to manga-page
    @PermitAll
    public List<CommentResponse> getComments(Integer mangaId) {
        var manga = mangaRepository.findById(mangaId).orElseThrow(()-> new RuntimeException("Manga with this id not found!"));

        return repository.findAllByManga(manga).stream().map(comment -> {
            var userSmallResponse = SmallUserResponse.builder()
                    .id(comment.getUser().getId())
                    .userPageId(comment.getUser().getUserPageId())
                    .nickname(comment.getUser().getNickname())
                    .userCover(FileUtils.readFileFromLocation(comment.getUser().getUserCover()))
                    .build();
            return CommentResponse.builder()
                    .id(comment.getId())
                    .message(comment.getMessage())
                    .user(userSmallResponse)
                    .build();
        }).toList();
    }


    //add comment
    //Добавить request, которой бы проверял длинну сообщения
    @PreAuthorize("hasAnyRole('USER', 'ADMIN','MODER')")
    public void addComment(Authentication connectedUser, CommentRequest request) {
        User user = ((User) connectedUser.getPrincipal());
        var manga = mangaRepository.findById(request.getMangaId()).orElseThrow(()-> new RuntimeException("Manga with this id not found!"));

        var previousComment = repository.findPreviousCommentByUser(manga, user);
        //Возможно придется поменять isPresent() на != null
        if(previousComment.isEmpty()) {
            var comment = Comment.builder()
                    .message(request.getContent())
                    .manga(manga)
                    .user(user)
                    .build();
            repository.save(comment);
            //???
        } else if (previousComment.isPresent() && LocalDateTime.now().isAfter(previousComment.get().getCreatedDate().plusMinutes(30))) {
            var comment = Comment.builder()
                    .message(request.getContent())
                    .manga(manga)
                    .user(user)
                    .build();
            repository.save(comment);
        } else {
            throw new RuntimeException("Please wait 30 minutes after your previous comment");
        }
    }

    //Когда нажимаешь изменить, должна быть проверка, что это твой коммент, а не чей то (ну или администратор/модератор должен быть)
    public boolean checkPermissionToEditComment(Authentication connectedUser, Integer commentId) {
        User user = ((User) connectedUser.getPrincipal());

        var comment = repository.findById(commentId).orElseThrow(()-> new RuntimeException("Comment with this id not found!"));
        if(comment.getUser() == user || user.getRole() == Role.ADMIN || user.getRole() == Role.MODER) {
            return true;
        } else return false;
    }


    //delete comment
    @PreAuthorize("hasAnyRole('ADMIN','MODER')")
    public void deleteCommentById(Authentication connectedUser, Integer commentId) {
        User user = ((User) connectedUser.getPrincipal());

        repository.deleteById(commentId);
    }

    //To admin
    //edit comment
    @PreAuthorize("hasRole('ADMIN')")
    //public List<CommentResponse> editComment(Authentication connectedUser, EditCommentRequest request) {
    public void editComment(Authentication connectedUser, EditCommentRequest request) {
        User user = ((User) connectedUser.getPrincipal());

        var currentComment = repository.findById(request.getCommentId()).orElseThrow(() -> new RuntimeException("Comment with this id not found!"));
            currentComment.setMessage(request.getEditContent());
            repository.save(currentComment);

            //Возвращаем обновленный список комментариев (возможно придется убрать)
        /*
            return repository.findAllByManga(currentComment.getManga()).stream().map(comment -> {
                var tmpUser = comment.getUser();
                var userSmallResponse = SmallUserResponse.builder()
                        .id(tmpUser.getId())
                        .userPageId(tmpUser.getUserPageId())
                        .nickname(tmpUser.getNickname())
                        .userCover(FileUtils.readFileFromLocation(comment.getUser().getUserCover()))
                        .build();
                return CommentResponse.builder()
                        .id(comment.getId())
                        .message(comment.getMessage())
                        .user(userSmallResponse)
                        .build();
            }).toList(); */

    }

}
