package com.apprisen.apprisenapi.service;

import com.apprisen.apprisenapi.model.auth.LinkApplicationRequest;
import com.apprisen.apprisenapi.model.auth.LinkedApplicationResponse;
import com.apprisen.apprisenapi.model.client.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ClientService extends BaseService {
    @Value("${resource.url.client.data}")
    private String clientDataUrl;

    @Value("${resource.url.client.verify}")
    private String verifyUrl;

    @Value("${resource.url.client.email}")
    private String emailUrl;

    @Value("${resource.url.auth.link}")
    private String linkedAppUrl;

    public ClientService(RestTemplate restTemplate, ObjectMapper mapper) {
        super(restTemplate, mapper);
    }

    public ClientDataResponse getClientData(String externalId, String authToken, String username, String expiresOn) {
        HttpHeaders headers = createAuthHeaders(authToken, username, expiresOn);
        String jsonResponse = invokeApiCall(clientDataUrl, headers, externalId);
        return mapJsonToObject(jsonResponse, ClientDataResponse.class);
    }

    public VerifyClientResponse verifyClient(String authToken, String username, String expiresOn, VerifyClientRequest request) {
        HttpHeaders headers = createAuthHeaders(authToken, username, expiresOn);
        String jsonResponse = invokeApiPostCall(verifyUrl, headers, request);
        return mapJsonToObject(jsonResponse, VerifyClientResponse.class);
    }

    public EmailResponse sendEmail(String authToken, String username, String expiresOn, EmailRequest request) {
        HttpHeaders headers = createAuthHeaders(authToken, username, expiresOn);
        String jsonResponse = invokeApiPostCall(emailUrl, headers, request);
        return mapJsonToObject(jsonResponse, EmailResponse.class);
    }

    public LinkedApplicationResponse linkApplicaiton (LinkApplicationRequest linkApplicationRequest) {
        String jsonResponse = invokeApiPostCall(linkedAppUrl,linkApplicationRequest);
        return mapJsonToObject(jsonResponse, LinkedApplicationResponse.class);
    }
}
