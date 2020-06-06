package com.apprisen.apprisenapi.model.casedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PayoffForecast {
    @JsonProperty("$id")
    private String id;
    private Date payoffDate;
    private List<Object> errors;
    private Boolean isSuccess;
}
