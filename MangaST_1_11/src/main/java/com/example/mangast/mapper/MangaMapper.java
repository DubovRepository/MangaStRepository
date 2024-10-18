package com.example.mangast.mapper;

import com.example.mangast.comments.Comment;
import com.example.mangast.comments.CommentResponse;
import com.example.mangast.file.FileUtils;
import com.example.mangast.manga.Manga;
import com.example.mangast.manga.MangaResponse;
import com.example.mangast.user.SmallUserResponse;
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
                        .comments(manga.getComments().stream().map(comment -> {
                            var smallUserDescription = SmallUserResponse.builder()
                                    .nickname(comment.getUser().getNickname())
                                    .userCover(FileUtils.readFileFromLocation(comment.getUser().getUserCover()))
                                    .id(comment.getUser().getId())
                                    .userPageId(comment.getUser().getUserPageId())
                                    .build();

                            return CommentResponse.builder()
                                    .id(comment.getId())
                                    .message(comment.getMessage())
                                    .user(smallUserDescription)
                                    .build();
                        }).toList())
                        .categoryList(manga.getCategory())
                        .rating(manga.getAverageRate())
                    .build()
        ).toList();
    }

    public static List<CommentResponse> CommentListToCommentResponse(List<Comment> commentList) {
        return commentList.stream().map(comment -> {
            var smallUserDescription = SmallUserResponse.builder()
                    .nickname(comment.getUser().getNickname())
                    .userCover(FileUtils.readFileFromLocation(comment.getUser().getUserCover()))
                    .id(comment.getUser().getId())
                    .userPageId(comment.getUser().getUserPageId())
                    .build();

            return CommentResponse.builder()
                    .id(comment.getId())
                    .message(comment.getMessage())
                    .user(smallUserDescription)
                    .build();
        }).toList();
    }
}
