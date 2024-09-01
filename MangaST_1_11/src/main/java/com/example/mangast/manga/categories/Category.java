package com.example.mangast.manga.categories;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@Entity
public class Category {

    @Id
    @GeneratedValue()
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private MangaCategories category;

    @Column(columnDefinition = "TEXT")
    private String shortDescription;




}
