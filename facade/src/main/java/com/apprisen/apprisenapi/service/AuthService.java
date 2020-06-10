package com.apprisen.apprisenapi.service;

import com.apprisen.apprisenapi.dto.auth.CredentialDto;
import com.apprisen.apprisenapi.model.auth.AuthenticationResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Slf4j
@Service
public class AuthService {

    @Value("${auth.url.login}")
    private String loginUrl;
    private RestTemplate restTemplate;
    private ObjectMapper mapper;

    public AuthService(RestTemplate restTemplate, ObjectMapper mapper) {
        this.restTemplate = restTemplate;
        this.mapper = mapper;
    }

    public AuthenticationResponse login(CredentialDto credentialDto) {
        Optional<String> response = Optional.ofNullable(restTemplate.postForObject(loginUrl, credentialDto, String.class));
        return response.map(this::mapData).orElse(null);
    }

    private AuthenticationResponse mapData(String data) {
        try {
            return mapper.readValue(data, AuthenticationResponse.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("An exception occurred mapping Json into AuthenticationResponse", e);
        }
    }
}
