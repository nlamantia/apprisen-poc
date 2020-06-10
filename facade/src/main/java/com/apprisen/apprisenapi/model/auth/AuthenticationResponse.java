
package com.apprisen.apprisenapi.model.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class AuthenticationResponse {

    @JsonProperty("$id")
    private String id;
    private String email;
    private List<Object> errors;
    private String expiresOn;
    private String firstName;
    private Boolean isSuccess;
    private String lastName;
    private List<LinkedApplication> linkedApplication;
    private String signedToken;
    private long statusCode;
    private String userId;
    private String username;

}
