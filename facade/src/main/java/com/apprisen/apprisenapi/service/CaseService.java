package com.apprisen.apprisenapi.service;

import com.apprisen.apprisenapi.model.casedata.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CaseService extends BaseService {

    @Value("${resource.url.client.info}")
    private String userUrl;

    @Value("${resource.url.case.summary}")
    private String caseSummaryUrl;

    @Value("${resource.url.case.debt-detail}")
    private String debtDetailUrl;

    @Value("${resource.url.case.payoffforecast}")
    private String payoffForecastUrl;

    @Value("${resource.url.payment.webpayment}")
    private String webPaymentUrl;

    @Value("${resource.url.payment.history}")
    private String paymentHistoryUrl;

    private RestTemplate restTemplate;

    public CaseService(RestTemplate restTemplate, ObjectMapper mapper) {
        super(restTemplate, mapper);
        this.restTemplate = restTemplate;
    }

    public ClientInformation getClientDetails(String externalId, String authToken, String username, String expiresOn) {
        HttpHeaders headers = createAuthHeaders(authToken, username, expiresOn);
        String jsonResponse = invokeApiCall(userUrl, headers, externalId);
        return mapJsonToObject(jsonResponse, ClientInformation.class);
    }

    public CaseSummary getCaseSummary(String externalId, String authToken, String username, String expiresOn) {
        HttpHeaders headers = createAuthHeaders(authToken, username, expiresOn);
        String jsonResponse = invokeApiCall(caseSummaryUrl, headers, externalId);
        return mapJsonToObject(jsonResponse, CaseSummary.class);
    }

    public DebtDetail getDebtDetails(String externalId, String authToken, String username, String expiresOn) {
        HttpHeaders headers = createAuthHeaders(authToken, username, expiresOn);
        String jsonResponse = invokeApiCall(debtDetailUrl, headers, externalId);
        return mapJsonToObject(jsonResponse, DebtDetail.class);
    }

    public PayoffForecast getPayoffForecast(String username, String authToken, String expiresOn, PayoffForecastRequest request) {
        HttpHeaders headers = createAuthHeaders(authToken, username, expiresOn);
        String jsonResponse = restTemplate
                .exchange(payoffForecastUrl, HttpMethod.POST, new HttpEntity<>(request, headers), String.class)
                .getBody();
        return mapJsonToObject(jsonResponse, PayoffForecast.class);
    }

    public WebPayment createWebPayment(WebPaymentRequest request, String username, String authToken, String expiresOn) {
        HttpHeaders headers = createAuthHeaders(authToken, username, expiresOn);
        String jsonResponse = restTemplate
                .exchange(webPaymentUrl, HttpMethod.POST, new HttpEntity<>(request, headers), String.class)
                .getBody();
        return mapJsonToObject(jsonResponse, WebPayment.class);
    }

    public PaymentHistory getPaymentHistory(String externalId, String username, String expiresOn, String authToken) {
        HttpHeaders headers = createAuthHeaders(authToken, username, expiresOn);
        String jsonResponse = invokeApiCall(paymentHistoryUrl, headers, externalId);
        return mapJsonToObject(jsonResponse, PaymentHistory.class);
    }

}
