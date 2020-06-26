package com.apprisen.apprisenapi.model.casedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class WebPayment {

    @JsonProperty("$id")
    private String id;
    private String confirmationNumber;
    private List<Object> errors;
    @JsonProperty("IsSuccess")
    private boolean isSuccess;

}

