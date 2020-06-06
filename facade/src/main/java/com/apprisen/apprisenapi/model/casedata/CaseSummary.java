
package com.apprisen.apprisenapi.model.casedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class CaseSummary {

    @JsonProperty("$id")
    private String id;
    private String clientName;
    private long currentMonthlyPayment;
    private List<Object> errors;
    private double estimatedBalance;
    private FirstDisbursementDate firstDisbursementDate;
    private Boolean isSuccess;
    private long monthlyDueOn;
    private String nextPaymentDueOn;
    private long totalMonthlyDeposit;

}
