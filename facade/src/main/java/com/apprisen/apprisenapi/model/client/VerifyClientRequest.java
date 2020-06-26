package com.apprisen.apprisenapi.model.client;

import lombok.Data;

@Data
public class VerifyClientRequest {
    private String last4SSN;
    private String zipCode;
    private String clientNumber;
}
