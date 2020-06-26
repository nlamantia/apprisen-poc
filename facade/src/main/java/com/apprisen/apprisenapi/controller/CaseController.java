package com.apprisen.apprisenapi.controller;

import com.apprisen.apprisenapi.model.casedata.*;
import com.apprisen.apprisenapi.service.CaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/case")
public class CaseController {

    private CaseService caseService;

    public CaseController(CaseService caseService) {
        this.caseService = caseService;
    }

    @GetMapping("/client-details/{externalId}")
    public ResponseEntity<ClientInformation> clientDetails(
            @RequestHeader("Authorization-Token") String authToken,
            @RequestHeader("Username") String userName,
            @RequestHeader("ExpiresOn") String expiresOn,
            @PathVariable("externalId") String externalId) {

        ClientInformation clientInformation = caseService.getClientDetails(externalId, authToken, userName, expiresOn);
        return ResponseEntity.ok(clientInformation);
    }

    @GetMapping("/case-summary/{externalId}")
    public ResponseEntity<CaseSummary> caseSummary(
            @RequestHeader("Authorization-Token") String authToken,
            @RequestHeader("Username") String userName,
            @RequestHeader("ExpiresOn") String expiresOn,
            @PathVariable("externalId") String externalId) {

        log.info("Received caseSummary request");
        CaseSummary caseSummary = caseService.getCaseSummary(externalId, authToken, userName, expiresOn);
        log.info("Returning caseSummary: {}", caseSummary);
        return ResponseEntity.ok(caseSummary);
    }

    @GetMapping("/debt-details/{externalId}")
    public ResponseEntity<DebtDetail> debtDetail(
            @RequestHeader("Authorization-Token") String authToken,
            @RequestHeader("Username") String userName,
            @RequestHeader("ExpiresOn") String expiresOn,
            @PathVariable("externalId") String externalId) {

        log.info("Received debtDetails request");
        DebtDetail debtDetail = caseService.getDebtDetails(externalId, authToken, userName, expiresOn);
        log.info("Returning debtDetails: {}", debtDetail);
        return ResponseEntity.ok(debtDetail);
    }

    @PostMapping("/payoffforecast")
    public ResponseEntity<PayoffForecast> payoffForecast(
            @RequestHeader("Authorization-Token") String authToken,
            @RequestHeader("Username") String userName,
            @RequestHeader("ExpiresOn") String expiresOn,
            @RequestBody PayoffForecastRequest request) {

        log.info("Received payoffForecast request");
        PayoffForecast payoffForecast = caseService.getPayoffForecast(userName, authToken, expiresOn, request);
        log.info("Returning payoffForecast: {}", payoffForecast);
        return ResponseEntity.ok(payoffForecast);
    }

    @PostMapping("/payment")
    public ResponseEntity<WebPayment> webPayment (
            @RequestHeader("Authorization-Token") String authToken,
            @RequestHeader("Username") String userName,
            @RequestHeader("ExpiresOn") String expiresOn,
            @RequestBody WebPaymentRequest request) {

        log.info("Received webPayment request");
        WebPayment webPayment = caseService.createWebPayment(request, userName, authToken, expiresOn);
        log.info("Returning webPayment: {}", webPayment);
        return ResponseEntity.ok(webPayment);
    }

    @GetMapping("payment-history/{externalId}")
    public ResponseEntity<PaymentHistory> paymentHistory(
            @RequestHeader("Authorization-Token") String authToken,
            @RequestHeader("Username") String userName,
            @RequestHeader("ExpiresOn") String expiresOn,
            @PathVariable String externalId
    ) {

        log.info("Recieved paymentHistory request");
        PaymentHistory paymentHistory = caseService.getPaymentHistory(externalId, userName, expiresOn, authToken);
        log.info("Returning paymentHistory: {}", paymentHistory);
        return ResponseEntity.ok(paymentHistory);
    }


}
