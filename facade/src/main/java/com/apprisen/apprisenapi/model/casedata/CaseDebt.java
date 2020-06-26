
package com.apprisen.apprisenapi.model.casedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CaseDebt {

    @JsonProperty("$id")
    private String id;
    private String accountNumber;
    private double apr;
    private String creditorName;
    private double currentBalance;
    private String debtId;
    private long debtType;
    private String lastCreditorPaymentDate;
    private long originalBalance;
    private double totalPaidLastMonth;
    private double totalPaidToDate;
}
