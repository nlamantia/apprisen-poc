package com.apprisen.apprisenapi.dto.auth;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CredentialDto {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
