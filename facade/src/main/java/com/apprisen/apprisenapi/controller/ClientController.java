package com.apprisen.apprisenapi.controller;

import com.apprisen.apprisenapi.model.auth.LinkApplicationRequest;
import com.apprisen.apprisenapi.model.auth.LinkedApplicationResponse;
import com.apprisen.apprisenapi.model.client.*;
import com.apprisen.apprisenapi.service.ClientService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/client")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("getclientdata/{id}")
    public ResponseEntity<ClientDataResponse> caseSummary(
            @RequestHeader("Authorization-Token") String authToken,
            @RequestHeader("Username") String userName,
            @RequestHeader("ExpiresOn") String expiresOn,
            @PathVariable("id") String externalId) {

        log.info("Received clientData request");
        ClientDataResponse clientData = clientService.getClientData(externalId, authToken, userName, expiresOn);
        log.info("Returning clientData: {}", clientData);
        return ResponseEntity.ok(clientData);
    }

    @PostMapping("verifyclientnumber")
    public ResponseEntity<VerifyClientResponse> verifyClientNumber(
            @RequestHeader("Authorization-Token") String authToken,
            @RequestHeader("Username") String userName,
            @RequestHeader("ExpiresOn") String expiresOn,
            @RequestBody VerifyClientRequest request) {

        log.info("Received VerifyClientRequest request");
        VerifyClientResponse response = clientService.verifyClient(authToken, userName, expiresOn, request);
        log.info("Returning clientData: {}", response);
        return ResponseEntity.ok(response);
    }

    @PostMapping("sendemail")
    public ResponseEntity<EmailResponse> sendEmail(
            @RequestHeader("Authorization-Token") String authToken,
            @RequestHeader("Username") String userName,
            @RequestHeader("ExpiresOn") String expiresOn,
            @RequestBody EmailRequest request) {

        log.info("Received email request");
        EmailResponse response = clientService.sendEmail(authToken, userName, expiresOn, request);
        log.info("Returning email response: {}", response);
        return ResponseEntity.ok(response);
    }

    @PostMapping("link-application")
    public ResponseEntity<LinkedApplicationResponse> linkApplication (
            @RequestBody LinkApplicationRequest linkApplicationRequest
            ){
        log.info("Recieved Linked App Request");
        LinkedApplicationResponse response = clientService.linkApplicaiton(linkApplicationRequest);
        log.info("Returning linked app request: {}", response);
        return ResponseEntity.ok(response);
    }

}
