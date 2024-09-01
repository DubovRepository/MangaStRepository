package com.example.mangast;

import com.example.mangast.manga.Manga;
import com.example.mangast.manga.MangaRepository;
import com.example.mangast.manga.TypeManga;
import com.example.mangast.manga.categories.CategoriesRepository;
import com.example.mangast.manga.categories.Category;
import com.example.mangast.manga.categories.MangaCategories;
import com.example.mangast.manga.chapters.MangaChapters;
import com.example.mangast.manga.chapters.MangaChaptersRepository;

import com.example.mangast.user.User;
import com.example.mangast.user.UserRepository;
import com.example.mangast.user.role.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.List;
import java.util.Set;

@SpringBootApplication
@EnableAsync
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class MangaStApplication {

    public static void main(String[] args) {
        SpringApplication.run(MangaStApplication.class, args);
    }
    @Bean
    CommandLineRunner runner(CategoriesRepository categoriesRepository, MangaChaptersRepository chaptersRepository, UserRepository userRepository, MangaRepository mangaRepository) {
        return args -> {

/*
            var firstManga = Manga.builder()
                    .title("first")
                    .description("----")
                    .authorName("ssfdsg")
                    .achieved(false)
                    .pathTitle("first")
                    .createdBy(1)
                    .mangaCover("./uploads/manga/1/gerb.jpg")
                    .typeManga(TypeManga.MANGA)
                    //.categories(Set.of(MangaCategories.School, MangaCategories.Fantasy))
                    .mangaPageId("333333")
                    .verified(true)
                    .build();
            mangaRepository.save(firstManga);


            var secondManga = Manga.builder()
                    .title("second")
                    .pathTitle("second")
                    .description("----")
                    .authorName("ssfdsg")
                    .achieved(false)
                    .createdBy(1)
                    .mangaPageId("444444")
                    .typeManga(TypeManga.MANGA)
                    .verified(true)
                    //.categories(Set.of(MangaCategories.School, MangaCategories.Fantasy, MangaCategories.Adventure))
                    .build();
            mangaRepository.save(secondManga);

            var temp_user = User.builder()
                    .email("test@mail.ru")
                    .userPageId("1234567888")
                    .password("$2a$10$yPWEwBe/aDCIKdbP4.YqmuYk9btUO3HoLGJPZhdmjZz3nRm9dbIgC")
                    .isBanned(false)
                    .nickname("Lolka")
                    .role(Role.USER)
                    .favoriteList(List.of(firstManga, secondManga))
                    .userCover("./uploads/users/1/123.png")
                    .build();
            userRepository.save(temp_user);



            var firstManga = mangaRepository.findByMangaPageId("333333").orElseThrow();

            var firstChapters = MangaChapters.builder()
                    //.numberId("1")
                    .title("1.First chapter")
                    .createdBy(1)
                    //.translator(temp_user)
                    .number(1)
                    .manga(firstManga)
                    .verified(false)
                    .build();
            chaptersRepository.save(firstChapters);

            var secondChapters = MangaChapters.builder()
                    //.numberId("2")
                    .title("2.Second chapter")
                    .createdBy(1)
                    //.translator(temp_user)
                    .manga(firstManga)
                    .number(2)
                    .verified(false)
                    .build();
            chaptersRepository.save(secondChapters);



            var thirdManga = Manga.builder()
                    .title("third")
                    .pathTitle("third")
                    .description("----")
                    .authorName("ssfdsg")
                    .mangaPageId("555555")
                    .achieved(false)
                    .createdBy(1)
                    .verified(true)
                    .typeManga(TypeManga.MANGA)
                    //.categories(Set.of(MangaCategories.Crime,MangaCategories.School, MangaCategories.Fantasy, MangaCategories.Adventure))
                    .build();
            mangaRepository.save(thirdManga);


            var admin_user = User.builder()
                    .email("admin@mail.ru")
                    .userPageId("1234567999")
                    .password("$2a$10$yPWEwBe/aDCIKdbP4.YqmuYk9btUO3HoLGJPZhdmjZz3nRm9dbIgC")
                    .isBanned(false)
                    .nickname("Soska")
                    .role(Role.ADMIN)
                    .favoriteList(List.of(thirdManga))
                    .build();
            userRepository.save(admin_user);

            var firstCategory = Category.builder()
                    .category(MangaCategories.Adventure)
                    .shortDescription("-")
                    .build();
            categoriesRepository.save(firstCategory);

            var secondCategory = Category.builder()
                    .category(MangaCategories.Crime)
                    .shortDescription("-")
                    .build();
            categoriesRepository.save(secondCategory);

            var testManga = Manga.builder()
                    .title("test")
                    .pathTitle("test")
                    .description("----")
                    .authorName("ssfdsg")
                    .mangaPageId("566555")
                    .achieved(false)
                    .createdBy(1)
                    .typeManga(TypeManga.MANGA)
                    //.categories(Set.of(MangaCategories.Crime,MangaCategories.School, MangaCategories.Fantasy, MangaCategories.Adventure))
                    .category(List.of(firstCategory, secondCategory))
                    .build();
            mangaRepository.save(testManga);
             */

            /*
            var firstManga = mangaRepository.findById(1).orElseThrow();
            var thirdManga = mangaRepository.findById(3).orElseThrow();

            var admin_user = userRepository.findByEmail("admin@mail.ru").orElseThrow();
            admin_user.setFavoriteList(List.of(firstManga, thirdManga));

            userRepository.save(admin_user); */



        };

    }
}
