package com.apprisen.apprisenapi.model.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class LinkedApplicationResponse {

    @JsonProperty("$id")
    private String id;
    private Boolean isSuccess;
    private List<Object> errors;

}
