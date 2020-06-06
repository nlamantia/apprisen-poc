package com.apprisen.apprisenapi.model.casedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class PaymentHistory {

    @JsonProperty("$id")
    private String id;
    private List<Object> errors;
    @JsonProperty("IsSuccess")
    private boolean isSuccess;
    private List<CaseDeposit> caseDeposits;

}
