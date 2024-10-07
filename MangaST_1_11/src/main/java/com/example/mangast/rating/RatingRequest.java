package com.example.mangast.rating;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RatingRequest {
    private Integer mangaId;

    private float userRate;
}
