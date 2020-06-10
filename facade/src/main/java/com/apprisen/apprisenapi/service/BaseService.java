package com.apprisen.apprisenapi.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

public class BaseService {

    private RestTemplate restTemplate;
    private ObjectMapper mapper;

    protected BaseService(RestTemplate restTemplate, ObjectMapper mapper) {
        this.restTemplate = restTemplate;
        this.mapper = mapper;
    }

    protected HttpHeaders createAuthHeaders(String authToken, String username, String expiresOn) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization-Token", authToken);
        headers.add("Username", username);
        headers.add("ExpiresOn", String.valueOf(expiresOn));
        return headers;
    }

    protected String invokeApiCall(String url, HttpHeaders headers, String externalId) {
        return restTemplate
                .exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class, externalId)
                .getBody();
    }

    protected String invokeApiPostCall(String url, HttpHeaders headers, Object request) {
        return restTemplate
                .exchange(url, HttpMethod.POST, new HttpEntity<>(request, headers), String.class)
                .getBody();
    }

    protected String invokeApiPostCall(String url, Object request) {
        return restTemplate
                .exchange(url, HttpMethod.POST, new HttpEntity<>(request), String.class)
                .getBody();
    }

    protected <T> T mapJsonToObject(String jsonResponse, Class<T> classType) {
        try {
            return mapper.readValue(jsonResponse, classType);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to map Json to " + classType.getSimpleName() + " object.", e);
        }
    }
}
