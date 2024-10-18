
package com.example.mangast.manga;

import com.example.mangast.manga.categories.Category;
import com.example.mangast.manga.chapters.MangaChapters;
import com.example.mangast.rating.Rating;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@Entity
public class Manga {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true)
    private String title;

    private String authorName;

    @Column(unique = true)
    private String mangaPageId;

    private String mangaCover;

    @Enumerated(EnumType.STRING)
    private MangaStatus status;

    @OneToMany(mappedBy = "manga")
    private List<Rating> ratings;

    /*
    Мы делаем так, мы везде ставим achieved false
    но как только мы будем запрашивать весь список
    манги, то у нас будет AuthenticatedUser
    и мы достанем список избранных его произведений
    и уже в ResponseListManga мы поменяем, что у него избранное
    а что нет

    ==================

    Или можно сделать так, в начале выставляем всем achieved = false
    но потом смотрим в favoriteList у authenticatedUser и выставляем
    у тех achieved = true
     */
    private boolean achieved;

    @Column(nullable = false)
    private boolean verified; //Проверка от администрации на доступность и нарушение правил

    @Enumerated(EnumType.STRING)
    private TypeManga typeManga;


    @OneToMany(mappedBy = "manga")
    private List<MangaChapters> chapters;

    private String pathTitle;

    @Column(columnDefinition = "TEXT")
    private String description;


    @OneToMany
    private List<Category> category;



    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDate lastModifiedDate;

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private Integer createdBy;

    @LastModifiedBy
    @Column(insertable = false)
    private Integer lastModifiedBy;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Manga manga = (Manga) o;
        return Objects.equals(id, manga.id) && Objects.equals(mangaPageId, manga.mangaPageId) && Objects.equals(createdDate, manga.createdDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, mangaPageId, createdDate);
    }

    public double getAverageRate() {
        if(ratings==null || ratings.isEmpty()) {
            return 0.0;
        }
        var rating = ratings.stream().mapToDouble(Rating::getRate).average().orElse(0.0);
        return (double) Math.round(rating * 10.0) / 10.0;
    }
}

