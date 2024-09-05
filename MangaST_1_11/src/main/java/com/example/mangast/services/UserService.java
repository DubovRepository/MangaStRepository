package com.example.mangast.services;

import com.example.mangast.file.FileStorage;
import com.example.mangast.file.FileUtils;
import com.example.mangast.manga.Manga;
import com.example.mangast.manga.MangaResponse;
import com.example.mangast.page.PageResponse;
import com.example.mangast.request.ChangePasswordRequest;
import com.example.mangast.user.User;
import com.example.mangast.user.UserRepository;
import com.example.mangast.user.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final FileStorage fileStorage;


    public void updateProfileCover(Authentication connectedUser, MultipartFile file) {
        User user = ((User) connectedUser.getPrincipal());

        var newCover = fileStorage.saveProfileCover(file, user.getId());
        if(!newCover.isEmpty()) {
            user.setUserCover(newCover);
            userRepository.save(user);
        }
    }

    public void changePassword(ChangePasswordRequest request, Principal connectUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectUser).getPrincipal();

        if(!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password"); //Не очень исключение, потом поменять с помощью HandleException
        }

        if(!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("The confirmation passwords is not equals");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

    }

    public PageResponse<MangaResponse> findFavoriteListByUser(Authentication connectedUser, int page, int size) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size);
        Page<Manga> favList = userRepository.findFavoriteListByUserId(pageable, user.getId());
        if(favList.isEmpty()) {
            throw new RuntimeException("Sorry, but you don`t have favorite manga");
        }
        List<MangaResponse> listResponse = favList.stream().map(manga ->
            MangaResponse.builder()
                    .id(manga.getId())
                    .mangaCover(FileUtils.readFileFromLocation(manga.getMangaCover()))
                    .typeManga(manga.getTypeManga())
                    .title(manga.getTitle())
                    .pathTitle(manga.getPathTitle())
                    .description(manga.getDescription())
                    .mangaPageId(manga.getMangaPageId())
                    .achieved(true)
                    .status(manga.getStatus())
                    .authorName(manga.getAuthorName())
                    .build()
        ).toList();
        return new PageResponse<>(
                listResponse,
                favList.getNumber(),
                favList.getSize(),
                favList.getTotalElements(),
                favList.getTotalPages(),
                favList.isFirst(),
                favList.isLast()
        );
    }

    public UserResponse infoByUser(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .role(user.getRole())
                .userPageId(user.getUserPageId())
                .isBanned(user.isBanned())
                .isActivated(user.isActivated())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .aboutYou(user.getAboutYou())
                .birthday(user.getBirthday())
                .userCover(FileUtils.readFileFromLocation(user.getUserCover()))
                .build();
    }
}
