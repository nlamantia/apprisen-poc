package com.apprisen.apprisenapi.model.auth;

import lombok.Data;

@Data
public class LinkApplicationRequest {

    private String application;
    private String externalApplicationId;
    private String signedToken;
    private String userName;
    private long expiresOn;
}
