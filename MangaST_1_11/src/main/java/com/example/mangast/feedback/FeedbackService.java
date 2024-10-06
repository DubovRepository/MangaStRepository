package com.example.mangast.feedback;

import com.example.mangast.manga.MangaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final MangaRepository mangaRepository;
    private final FeedbackRepository repository;


    public float getAverage(Integer mangaId) {
        var manga = mangaRepository.findById(mangaId).orElseThrow(() -> new RuntimeException("Manga with this id not exists!"));

        float avg = Math.round(repository.getAverageByManga(manga) * 10)/10F;
        return avg;
    }
}
