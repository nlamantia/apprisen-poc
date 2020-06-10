package com.apprisen.apprisenapi.model.casedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PayoffForecastRequest {
    private long caseNumber;
    private long increaseAmount;
    @JsonProperty("isOneTimePayment")
    private boolean isOneTimePayment;
}
