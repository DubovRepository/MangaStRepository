package com.example.mangast.admin;

import com.example.mangast.file.FileStorage;
import com.example.mangast.file.FileUtils;
import com.example.mangast.manga.*;
import com.example.mangast.manga.chapters.ChapterResponse;
import com.example.mangast.manga.chapters.MangaChaptersRepository;
import com.example.mangast.page.PageResponse;
import com.example.mangast.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.SecureRandom;
import java.util.List;

import static com.example.mangast.mapper.MangaMapper.toMangaResponseList;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {
    private final MangaRepository repository;
    private final FileStorage fileStorage;
    private final MangaChaptersRepository chaptersRepository;

    @Transactional
    public Integer save(MangaRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        var mangaPageId = generateMangaPageId(6);
        var manga = Manga.builder()
                .title(request.getTitle())
                .typeManga(request.getTypeManga())
                .authorName(request.getAuthorName())
                .mangaPageId(mangaPageId)
                .achieved(false)
                .description(request.getDescription())
                .category(request.getMangaCategories())
                .status(request.getStatus())
                .verified(true)
                .build();
        var savedManga = repository.save(manga); //save manga to generate Id

        log.info("New manga successfully created by admin id: {}!", user.getId());
        return savedManga.getId();
    }

    @Transactional
    public Integer update(UpdateMangaRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        var manga = repository.findById(request.getId()).orElseThrow(() -> new UsernameNotFoundException("Manga with this id not found!"));

        if(!(manga.getTitle() == request.getTitle() && manga.getDescription() == request.getDescription()
                && manga.getTypeManga() == request.getTypeManga() && manga.getAuthorName() == request.getAuthorName()
                && manga.getCategory() == request.getCategoryList() && manga.getStatus() == request.getStatus()
        )) {
            manga.setTitle(request.getTitle());
            manga.setDescription(request.getDescription());
            manga.setTypeManga(request.getTypeManga());
            manga.setAuthorName(request.getAuthorName());
            manga.setCategory(request.getCategoryList());
            manga.setStatus(request.getStatus());
            repository.save(manga);
            log.info("Manga successfully updated by admin id: {}!", user.getId());
        }

        return manga.getId();
    }

    @Transactional
    public void loadCoverByManga(Integer mangaId, MultipartFile file, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        if (file != null && !file.isEmpty()) {
            var savedManga = repository.findById(mangaId).orElseThrow(() -> new RuntimeException("Manga is not found!"));
            var profilePicture = fileStorage.saveUploadFile(file, savedManga.getId()); //get cover
            savedManga.setMangaCover(profilePicture); // set cover
            repository.save(savedManga); //save manga cover
            log.info("Manga cover successfully upload by admin id: {}!", user.getId());
        }
    }

    public PageResponse<MangaResponse> findAllMangaWithUnverifiedChapters(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").ascending());
        Page<Manga> listManga = chaptersRepository.findAllMangaWithUnverifiedChapters(pageable);
        List<MangaResponse> mangaResponseList = toMangaResponseList(listManga);

        return new PageResponse<>(
                mangaResponseList,
                listManga.getNumber(),
                listManga.getSize(),
                listManga.getTotalElements(),
                listManga.getTotalPages(),
                listManga.isFirst(),
                listManga.isLast()
        );
    }

    public PageResponse<MangaResponse> findMangaWithUnverifiedChaptersByTitle(String title, int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Manga> listManga = chaptersRepository.findMangaWithUnverifiedChaptersByTitle(title, pageable);
        List<MangaResponse> mangaResponseList = toMangaResponseList(listManga);

        return new PageResponse<>(
                mangaResponseList,
                listManga.getNumber(),
                listManga.getSize(),
                listManga.getTotalElements(),
                listManga.getTotalPages(),
                listManga.isFirst(),
                listManga.isLast()
        );
    }

    public List<ChapterResponse> findUnverifiedChaptersByManga(Authentication connectedUser, Integer mangaId) {
        User user = ((User) connectedUser.getPrincipal());
        var manga = repository.findById(mangaId).orElseThrow(() -> new RuntimeException("Manga with this id not found!"));
        List<ChapterResponse> chaptersList = chaptersRepository.findAllUnverifiedChaptersByManga(manga)
                .stream().map((chapter) -> ChapterResponse.builder()
                        .id(chapter.getId())
                        .number(chapter.getNumber())
                        .content(FileUtils.readFileFromLocation(chapter.getContent()))
                        .title(chapter.getTitle())
                        .mangaPageId(manga.getMangaPageId())
                        .build()).toList();
        return chaptersList;
    }


    public ChapterResponse findUnverifiedChapterByPageIdAndChapterId(Authentication connectedUser,String pageId, Integer chapId) {
        User user = ((User) connectedUser.getPrincipal());

        var manga = repository.findByMangaPageId(pageId).orElseThrow(() -> new RuntimeException("Manga with this page id not found!"));

        var chapter = chaptersRepository.findUnverifiedChapterById(chapId).orElseThrow(() -> new RuntimeException("This chapter not exists or already verified!"));
        return ChapterResponse.builder()
                .id(chapter.getId())
                .number(chapter.getNumber())
                .content(FileUtils.readFileFromLocation(chapter.getContent()))
                .title(chapter.getTitle())
                .mangaPageId(manga.getMangaPageId())
                .build();
    }


    public void deleteUntrustedChapter(Integer chapterId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        //Вторая строка под вопросом, можно и без нее обойтись
        var untrustedChapter = chaptersRepository.findById(chapterId).orElseThrow(() -> new RuntimeException("Sorry but chapter cannot be delete, because it not found!"));

        //Удаление содержимого из папки
        fileStorage.deletePdfFile(untrustedChapter.getContent());

        chaptersRepository.deleteById(chapterId);
        log.info("Chapter request id: {} was deleted by admin id: {}!", chapterId ,user.getId());
    }

    public void approveTrustChapter(Integer chapterId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        var trustedChapter = chaptersRepository.findById(chapterId).orElseThrow(() -> new RuntimeException("Sorry but chapter not found!"));
        trustedChapter.setVerified(true);
        chaptersRepository.save(trustedChapter);
        log.info("Chapter request id: {} was successfully approve by admin id: {}!", chapterId, user.getId());
        //Удаление других запросов с таким же number
        var checkSize = chaptersRepository.checkToExistsManyChaptersWithThisNumber(trustedChapter.getManga(), trustedChapter.getNumber(), trustedChapter.getId()).size();
        if(checkSize > 0) {
            chaptersRepository.deleteDuplicatesUnverifiedChapterNumber(trustedChapter.getNumber(), trustedChapter.getManga());
        }
    }


    public void deleteMangaById(Integer mangaId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        //Можно добавить какую либо проверку на наличие
        fileStorage.deleteMangaDirectory(mangaId);
        repository.deleteById(mangaId);
        log.info("Manga id: {} was deleted by admin id: {}!", mangaId ,user.getId());
    }


    private String generateMangaPageId(int length) {
        String characters = "0123456789";
        StringBuilder pageIdBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            pageIdBuilder.append(characters.charAt(randomIndex));
        }
        return pageIdBuilder.toString();
    }

}
