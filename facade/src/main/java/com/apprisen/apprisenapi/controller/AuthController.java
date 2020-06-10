package com.apprisen.apprisenapi.controller;

import com.apprisen.apprisenapi.dto.auth.CredentialDto;
import com.apprisen.apprisenapi.model.auth.AuthenticationResponse;
import com.apprisen.apprisenapi.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;
    private String clientInfoUrl = "https://icm-services-testing.apprisen.com/api/client/getclientinformation/";
    private ExecutorService executorService = Executors.newFixedThreadPool(5);

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody CredentialDto credentialDto) {
        AuthenticationResponse authenticationResponse = authService.login(credentialDto);
        log.info("AuthResponse: {}", authenticationResponse);
        return ResponseEntity.ok(authenticationResponse);
    }



//    private List<String> retrieveClientInfo(AuthenticationResponse authenticationResponse) {
//        return authenticationResponse.getLinkedApplication().stream()
//                .map(app -> CompletableFuture.supplyAsync(() -> getClientInfo(authenticationResponse, app.getExternalId()), executorService))
//                .collect(Collectors.toList())
//                .stream()
//                .map(CompletableFuture::join)
//                .collect(Collectors.toList());
//    }



}
