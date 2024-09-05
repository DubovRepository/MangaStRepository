package com.example.mangast.manga.chapters;

import com.example.mangast.file.FileStorage;
import com.example.mangast.file.FileUtils;
import com.example.mangast.manga.Manga;
import com.example.mangast.manga.MangaRepository;
import com.example.mangast.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class MangaChapterService {
    private final MangaChaptersRepository repository;
    private final MangaRepository mangaRepository;
    private final FileStorage fileStorage;

    public List<ChapterResponse> findAllChaptersByMangaId(Integer mangaId) {
        var manga = mangaRepository.findById(mangaId).orElseThrow(() -> new RuntimeException("Manga with this id not found!"));

        return findVerifiedChapterListByManga(manga);
    }

    public List<ChapterResponse> findAllChapterByMangaPageId(String mangaPageId) {
        var manga = mangaRepository.findByMangaPageId(mangaPageId).orElseThrow(() -> new RuntimeException("Manga with this pageId not found!"));

        return findVerifiedChapterListByManga(manga);
    }

    @Transactional
    public Integer addUnverifiedChapter(Authentication connectedUser, ChaptersRequest request) {
        User user = ((User) connectedUser.getPrincipal());

        var manga = mangaRepository.findById(request.getMangaId()).orElseThrow(
                () -> new RuntimeException("Manga with this id not found!"));

        //Проверка на наличиее уже существующей и верифицированной главы с таким номером
        var checkChapter = repository.checkForExistenceChapterWithNumber(manga, request.getNumberChapter()); //Можно было использовать orElseThrow();
        if(checkChapter.isPresent()) {
            throw new RuntimeException("Chapter with this number already exists!");
        }

        var chapter = MangaChapters.builder()
                .number(request.getNumberChapter())
                .title(request.getChapterTitle())
                .manga(manga)
                .verified(false)
                .build();
        var savedChapter = repository.save(chapter);
        log.info("Unverified chapter id: {} was successfully add by user id: {}!", savedChapter.getId() ,user.getId());
        return savedChapter.getId();
    }

    @Transactional
    public void saveChapterPdf(Authentication connectedUser, Integer mangaId, Integer chapterId, MultipartFile file) {
        User user = ((User) connectedUser.getPrincipal());
        var chapter = repository.findById(chapterId).orElseThrow(() -> new RuntimeException("Chapter with this id not exists!"));

        String chapterContent = fileStorage.saveChapterPdfFile(file, mangaId, chapter.getNumber());
        chapter.setContent(chapterContent);
        repository.save(chapter);
        log.info("Unverified chapter id: {} was successfully upload pdf file by user id: {}!", chapterId ,user.getId());
    }

    public ChapterResponse findCurrentChapter(String mangaPageId, float chapterNumber) {
        var manga = mangaRepository.findByMangaPageId(mangaPageId).orElseThrow(() -> new RuntimeException("Manga with this id not found!"));

        var chapter = repository.checkForExistenceChapterWithNumber(manga, chapterNumber).orElseThrow(() -> new RuntimeException("This chapter not exists!"));
        return ChapterResponse.builder()
                .id(chapter.getId())
                .title(chapter.getTitle())
                .number(chapter.getNumber())
                .content(FileUtils.readFileFromLocation(chapter.getContent()))
                .mangaPageId(manga.getMangaPageId())
                .build();

    }

    private List<ChapterResponse> findVerifiedChapterListByManga(Manga manga) {
         return repository.findAllVerifiedChaptersByManga(manga).stream()
                 .map((chapter) -> ChapterResponse.builder()
                         .id(chapter.getId())
                         .title(chapter.getTitle())
                         .number(chapter.getNumber())
                         .content(FileUtils.readFileFromLocation(chapter.getContent()))
                         .mangaPageId(manga.getMangaPageId())
                         .build()).toList();
    }
}
