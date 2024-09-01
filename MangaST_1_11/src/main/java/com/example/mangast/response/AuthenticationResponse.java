package com.example.mangast.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
//@AllArgsConstructor
//@NoArgsConstructor
public class AuthenticationResponse {
    //@JsonProperty("access_token")
    private String accessToken;
    private String userRole;
    private String UserPageId;
    //@JsonProperty("refresh_token")
    //private String refreshToken;
}
