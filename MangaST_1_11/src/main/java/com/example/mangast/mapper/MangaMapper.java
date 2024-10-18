package com.example.mangast.mapper;

import com.example.mangast.comments.Comment;
import com.example.mangast.comments.CommentResponse;
import com.example.mangast.file.FileUtils;
import com.example.mangast.manga.Manga;
import com.example.mangast.manga.MangaResponse;
import org.springframework.data.domain.Page;

import java.util.List;


public class MangaMapper {

    public static List<MangaResponse> toMangaResponseList(Page<Manga> mangaList) {
        return mangaList.stream().map(manga ->
                MangaResponse.builder()
                    .id(manga.getId())
                    .mangaCover(FileUtils.readFileFromLocation(manga.getMangaCover()))
                    .typeManga(manga.getTypeManga())
                    .title(manga.getTitle())
                    .description(manga.getDescription())
                    .pathTitle(manga.getPathTitle())
                    .achieved(manga.isAchieved())
                    .authorName(manga.getAuthorName())
                    .mangaPageId(manga.getMangaPageId())
                    .status(manga.getStatus())
                        .comments(commentListToCommentResponse(manga.getComments()))
                        .categoryList(manga.getCategory())
                        .rating(manga.getAverageRate())
                    .build()
        ).toList();
    }

    public static List<CommentResponse> commentListToCommentResponse(List<Comment> commentList) {
        return commentList.stream().map(comment ->
            CommentResponse.builder()
                    .id(comment.getId())
                    .message(comment.getMessage())
                    .userId(comment.getUser().getId())
                    .userPageId(comment.getUser().getUserPageId())
                    .nickname(comment.getUser().getNickname())
                    .userCover(FileUtils.readFileFromLocation(comment.getUser().getUserCover()))
                    .build()
        ).toList();
    }
}
