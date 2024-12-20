package com.example.mangast.rating;

import com.example.mangast.manga.MangaRepository;
import com.example.mangast.user.User;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RatingService {
    private final MangaRepository mangaRepository;
    private final RatingRepository repository;


    //to all (catalog/manga-page)
    @PermitAll
    public Double getAverage(Integer mangaId) {
        var manga = mangaRepository.findById(mangaId).orElseThrow(() -> new RuntimeException("Manga with this id not exists!"));

        return Math.round(repository.getAverageByManga(manga) * 10)/10D;
    }

    //to User
    @PreAuthorize("hasAnyRole('ADMIN','MODER','USER')")
    public void addRating(Authentication connectedUser, RatingRequest request) {
        if(request.getUserRate() < 1.0) {
            return;
        }
        User user = ((User) connectedUser.getPrincipal());
        var checkFeedBack = repository.checkAlreadyExistsRating(request.getMangaId(), user);
        if(checkFeedBack != null) {
            checkFeedBack.setRate(request.getUserRate());
            repository.save(checkFeedBack);
            return;
            //Можно добавить else и запихнуть оставшуюся часть тела функции туда.
        }

        var manga = mangaRepository.findById(request.getMangaId()).orElseThrow(()-> new RuntimeException("Manga with this id not exists!"));

        var newFeedBack = Rating.builder()
                .rate(request.getUserRate())
                .manga(manga)
                .user(user)
                .build();
        repository.save(newFeedBack);
    }



}
