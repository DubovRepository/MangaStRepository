package com.example.mangast.comments;

import com.example.mangast.manga.MangaRepository;
import com.example.mangast.user.User;
import com.example.mangast.user.role.Role;
import lombok.RequiredArgsConstructor;
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
    public List<Comment> getComments(Integer mangaId) {
        var manga = mangaRepository.findById(mangaId).orElseThrow(()-> new RuntimeException("Manga with this id not found!"));

        return repository.findAllByManga(manga);
    }


    //add comment
    //Добавить request, которой бы проверял длинну сообщения
    public void addComment(Authentication connectedUser, Integer mangaId, String content) {
        User user = ((User) connectedUser.getPrincipal());
        var manga = mangaRepository.findById(mangaId).orElseThrow(()-> new RuntimeException("Manga with this id not found!"));

        var previousComment = repository.findPreviousCommentByUser(manga, user);
        if(previousComment != null && LocalDateTime.now().isAfter(previousComment.get().getCreatedDate().plusMinutes(30))) {
            var comment = Comment.builder()
                    .message(content)
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
    public void deleteCommentById(Authentication connectedUser, Integer commentId) {
        User user = ((User) connectedUser.getPrincipal());

        repository.deleteById(commentId);
    }

    //To admin
    //edit comment
    public List<Comment> editComment(Authentication connectedUser, Integer commentId, String editContent) {
        User user = ((User) connectedUser.getPrincipal());

        var currentComment = repository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment with this id not found!"));
        if(user.getRole() == Role.ADMIN || user.getRole() == Role.MODER) {
            currentComment.setMessage(editContent);
            repository.save(currentComment);

            //Возвращаем обновленный список комментариев (возможно придется убрать)
            return repository.findAllByManga(currentComment.getManga());
        } else {
            throw new RuntimeException("You are not admin/moderator!");
        }

    }

}
