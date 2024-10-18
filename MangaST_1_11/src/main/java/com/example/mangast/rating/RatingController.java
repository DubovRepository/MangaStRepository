package com.example.mangast.rating;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rating")
public class RatingController {
    private final RatingService service;

    @PostMapping("/addRating")
    public ResponseEntity<?> rateManga(Authentication connectedUser,
                                    @RequestBody RatingRequest request) {
        service.addRating(connectedUser, request);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/getAverageRate/{mangaId}")
    public ResponseEntity<Double> getAVG(@PathVariable("mangaId") Integer mangaId) {
        return ResponseEntity.ok(service.getAverage(mangaId));
    }
}
