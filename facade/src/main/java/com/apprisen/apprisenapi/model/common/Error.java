package com.apprisen.apprisenapi.model.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Error {
    @JsonProperty("$id")
    private String id;
    private String key;
    private String value;
}
