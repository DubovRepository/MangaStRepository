package com.example.mangast.user;

import com.example.mangast.manga.Manga;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    Optional<User> findByEmailIgnoreCase(String email);
    Optional<User> findByNickname(String nick);

    @Query("""
    SELECT u FROM User u INNER JOIN Token t ON u.id = t.user.id 
    WHERE t.token = :tokenT
    """)
    Optional<User> findByToken(String tokenT);

    @Query("""
    SELECT user.favoriteList FROM User user
    WHERE user.id = :userId 
    """)
    Page<Manga> findFavoriteListByUserId(Pageable pageable, Integer userId);

//    @Query("""
//    DELETE FROM User.favoriteList fav
//    WHERE fav = :mangaId
//    """)

    //List<Manga> findFavoriteListByUserId(Integer userId);
    //Optional<User> findUserByIdAndFavoriteListIn(Integer userId, LiteraryProduction book);


}
