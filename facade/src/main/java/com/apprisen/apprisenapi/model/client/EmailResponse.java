package com.apprisen.apprisenapi.model.client;

import com.apprisen.apprisenapi.model.common.Error;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EmailResponse {
    @JsonProperty("$id")
    private String id;
    private Error[] errors;
    @JsonProperty("IsSuccess")
    private boolean isSuccess = true;
}
