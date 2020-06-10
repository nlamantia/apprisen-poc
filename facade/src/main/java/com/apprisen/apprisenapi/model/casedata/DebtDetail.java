
package com.apprisen.apprisenapi.model.casedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class DebtDetail {

    @JsonProperty("$id")
    private String id;
    private List<CaseDebt> caseDebts;
    private List<Object> errors;
    private Boolean isSuccess;

}
