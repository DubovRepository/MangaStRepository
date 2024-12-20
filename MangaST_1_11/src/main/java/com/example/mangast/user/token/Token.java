package com.example.mangast.user.token;

import com.example.mangast.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Token {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true, columnDefinition = "TEXT")
    private String token;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType;

    private boolean expiredToken;

    private boolean revoked;

    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private User user;
}
