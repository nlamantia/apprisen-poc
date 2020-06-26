
package com.apprisen.apprisenapi.model.casedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FirstDisbursementDate {

    @JsonProperty("$id")
    private String id;
    private String calendar;
    private long ticks;

}
