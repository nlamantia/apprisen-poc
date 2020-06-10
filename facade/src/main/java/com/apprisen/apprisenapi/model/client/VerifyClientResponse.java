package com.apprisen.apprisenapi.model.client;

import com.apprisen.apprisenapi.model.common.Error;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class VerifyClientResponse {
    @JsonProperty("$id")
    private String responseId;
    private String firstName;
    private String address;
    private double dmpAmount;
    private String emailAddress;
    private String cellPhone;
    @JsonProperty("IsSuccess")
    private String isSuccess;
    private Error[] errors;
}
