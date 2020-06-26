package com.apprisen.apprisenapi.model.casedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class CaseDeposit {

    @JsonProperty("$id")
    private String id;
    private Date postedDate;
    private double amount;

}
