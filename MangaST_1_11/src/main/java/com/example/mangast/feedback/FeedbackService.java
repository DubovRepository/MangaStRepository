package com.example.mangast.feedback;

import com.example.mangast.manga.MangaRepository;
import com.example.mangast.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final MangaRepository mangaRepository;
    private final FeedbackRepository repository;


    //to all (catalog/manga-page)
    public float getAverage(Integer mangaId) {
        var manga = mangaRepository.findById(mangaId).orElseThrow(() -> new RuntimeException("Manga with this id not exists!"));

        float avg = Math.round(repository.getAverageByManga(manga) * 10)/10F;
        return avg;
    }

    //to User
    public void addFeedBack(Authentication connectedUser, Integer mangaId, float userRate) {
        if(userRate < 1) {
            return;
        }
        User user = ((User) connectedUser.getPrincipal());
        var checkFeedBack = repository.checkAlreadyExistsFeedback(mangaId, user);
        if(checkFeedBack != null) {
            checkFeedBack.setRate(userRate);
            repository.save(checkFeedBack);
            return;
            //Можно добавить else и запихнуть оставшуюся часть тела функции туда.
        }

        var manga = mangaRepository.findById(mangaId).orElseThrow(()-> new RuntimeException("Manga with this id not exists!"));

        var newFeedBack = Feedback.builder()
                .rate(userRate)
                .manga(manga)
                .user(user)
                .build();
        repository.save(newFeedBack);
    }



}
