package com.example.mangast.user;

import com.example.mangast.manga.MangaResponse;
import com.example.mangast.page.PageResponse;
import com.example.mangast.services.UserService;
import com.example.mangast.user.role.Role;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {
    private final UserService service;

    @GetMapping("/findNickname")
    public String findNickname(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        return user.getNickname();
    }

    //method return info by user
    @GetMapping("/find/infoUser")
    public ResponseEntity<UserResponse> infoByUser(
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.infoByUser(connectedUser));
    }

    @GetMapping("/find/favoriteList")
    public ResponseEntity<PageResponse<MangaResponse>> findUserFavoriteList(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findFavoriteListByUser(connectedUser, page, size));
    }

    @GetMapping("/isAdmin")
    public boolean isAdmin(
            Authentication connectedUser
            ) {
        User user = ((User) connectedUser.getPrincipal());
        if(user.getRole().equals(Role.ADMIN)) {
            return true;
        } else {
            return false;
        }
    }

    @PostMapping(value = "/updateProfileCover", consumes = "multipart/form-data")
    public ResponseEntity<?> loadNewProfileCover(
            Authentication connectedUser,
            @Parameter
            @RequestPart("file") MultipartFile file) {
        service.updateProfileCover(connectedUser, file);
        return ResponseEntity.accepted().build();
    }




}
