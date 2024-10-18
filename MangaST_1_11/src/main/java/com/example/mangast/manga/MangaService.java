package com.example.mangast.manga;

import com.example.mangast.file.FileUtils;
import com.example.mangast.manga.categories.MangaCategories;
import com.example.mangast.mapper.MangaMapper;
import com.example.mangast.page.PageResponse;
import com.example.mangast.user.User;
import com.example.mangast.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.example.mangast.mapper.MangaMapper.toMangaResponseList;

@Service
@RequiredArgsConstructor
public class MangaService {
    private final MangaRepository repository;
    private final UserRepository userRepository;



    public PageResponse<MangaResponse> findAllManga(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Manga> mangaList = repository.findAllAvailableManga(pageable);
        List<MangaResponse> mangaResponseList = toMangaResponseList(mangaList);

        return new PageResponse<>(
                mangaResponseList,
                mangaList.getNumber(),
                mangaList.getSize(),
                mangaList.getTotalElements(),
                mangaList.getTotalPages(),
                mangaList.isFirst(),
                mangaList.isLast()
        );
    }

    public PageResponse<MangaResponse> findFavoriteManga(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        //Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Pageable pageable = PageRequest.of(page, size);
        Page<Manga> favoriteList = userRepository.findFavoriteListByUserId(pageable, user.getId());
        List<MangaResponse> mangaResponseList = new ArrayList<>();
        favoriteList.forEach(manga -> {
                var tmpMangaResponse = MangaResponse.builder()
                        .id(manga.getId())
                        .title(manga.getTitle())
                        .authorName(manga.getAuthorName())
                        .mangaPageId(manga.getMangaPageId())
                        .pathTitle(manga.getPathTitle())
                        .typeManga(manga.getTypeManga())
                        .mangaCover(FileUtils.readFileFromLocation(manga.getMangaCover()))
                        .achieved(true)
                        .status(manga.getStatus())
                        .description(manga.getDescription())
                        .rating(manga.getAverageRate())
                        .categoryList(manga.getCategory())
                        .comments(MangaMapper.commentListToCommentResponse(manga.getComments()))
                        .build();
                mangaResponseList.add(tmpMangaResponse);
        });

        return new PageResponse<>(
                mangaResponseList,
                favoriteList.getNumber(),
                favoriteList.getSize(),
                favoriteList.getTotalElements(),
                favoriteList.getTotalPages(),
                favoriteList.isFirst(),
                favoriteList.isLast()
        );

    }

    public void addToFavorite(Integer mangaId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        //Можно сделать findUserById(user.getId()), но это необязательно
        var favoriteList = user.getFavoriteList();
        var manga = repository.findById(mangaId).orElseThrow(() -> new RuntimeException("Manga with this id not found!"));
        favoriteList.add(manga);
        user.setFavoriteList(favoriteList);
        userRepository.save(user);
    }

    public void deleteFromFavoriteByMangaId(Integer mangaId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        List<Manga> favoriteList = user.getFavoriteList();
        favoriteList.removeIf((manga) -> manga.getId().equals(mangaId));
        user.setFavoriteList(favoriteList);
        userRepository.save(user);
    }

    //Под удаление
    public List<MangaCategories> loadAllCategories() {
        return Arrays.stream(MangaCategories.values()).toList();
    }


    public MangaResponse findByPageId(String mangaPageId, Authentication connectedUser) {
        var manga = repository.findByMangaPageId(mangaPageId).orElseThrow(() -> new RuntimeException("Manga with this pageId not exist!"));
        if(!manga.isVerified()) {
            throw new RuntimeException("Manga is not verified yet!");
        }
        var tmpAchieve = false;

        //Можно просто передать Authentication и проверить != null его, но пока так проверяю
        //User user = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        if(connectedUser != null) {
            User user = ((User) connectedUser.getPrincipal());
            //var favoriteList = userRepository.findFavoriteListByUserId(user.getId());
            tmpAchieve = user.getFavoriteList().stream().anyMatch(manga1 -> manga1.getMangaPageId().equals(mangaPageId));
            /*
            var favoriteList = user.getFavoriteList();
            if (favoriteList.isEmpty()) {
                tmpAchieve = false;
            } else {
                for (Manga m : favoriteList) {
                    if (m.equals(manga)) {
                        tmpAchieve = true;
                        break;
                    }
                }
            } */
        }

        return MangaResponse.builder()
                .id(manga.getId())
                .mangaCover(FileUtils.readFileFromLocation(manga.getMangaCover()))
                .typeManga(manga.getTypeManga())
                .title(manga.getTitle())
                .description(manga.getDescription())
                .pathTitle(manga.getPathTitle())
                .achieved(tmpAchieve)
                .authorName(manga.getAuthorName())
                .mangaPageId(manga.getMangaPageId())
                .status(manga.getStatus())
                .rating(manga.getAverageRate())
                .comments(MangaMapper.commentListToCommentResponse(manga.getComments()))
                .categoryList(manga.getCategory())
                .build();
    }


    public PageResponse<MangaResponse> findByTitle(int page, int size, String title) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Manga> mangaList = repository.findAllByTitleContaining(title, pageable);
        if(mangaList.isEmpty()) {
            throw new RuntimeException("Sorry, but nothing not found");
        }
        List<MangaResponse> responseList = toMangaResponseList(mangaList);
        return new PageResponse<>(
                responseList,
                mangaList.getNumber(),
                mangaList.getSize(),
                mangaList.getTotalElements(),
                mangaList.getTotalPages(),
                mangaList.isFirst(),
                mangaList.isLast()
        );
    }

    public List<MangaStatus> findAllMangaStatus() {
        return Arrays.stream(MangaStatus.values()).toList();
    }
}
