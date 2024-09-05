package com.example.mangast.manga.chapters;

import com.example.mangast.manga.Manga;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@EntityListeners(AuditingEntityListener.class)
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MangaChapters {


    @Id
    @GeneratedValue()
    private Integer id;

    private float number; //Возможно придется поменять на Float

    private String title; //Может например быть ЭКСТРА или еще какая-нибудь

    @ManyToOne
    @JoinColumn(name = "manga_id")
    private Manga manga;


    private boolean verified;

    private String content; //PDF FILE



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

}
