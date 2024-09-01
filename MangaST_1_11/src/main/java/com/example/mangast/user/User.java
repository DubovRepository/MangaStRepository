package com.example.mangast.user;

import com.example.mangast.manga.Manga;

import com.example.mangast.user.role.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User implements UserDetails, Principal {

    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String email;
    private String password;
    @Column(unique = true)
    private String nickname;
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(unique = true)
    private String userPageId;

//    @OneToMany(mappedBy = "user")
//    private List<Token> tokens;
    private boolean isBanned;
    private boolean isActivated;
    private String firstname;
    private String lastname;
    private String aboutYou; //Описание о себе
    private LocalDate birthday;
    private String userCover;


    //private List<LiteraryProduction> favoriteList;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Manga> favoriteList;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return email;
    }

    public String getFullName() { return firstname + " " + lastname; }
}
