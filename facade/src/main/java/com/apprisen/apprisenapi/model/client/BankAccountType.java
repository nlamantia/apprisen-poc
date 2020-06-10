package com.apprisen.apprisenapi.model.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BankAccountType {
    @JsonProperty("$id")
    private String resourceId;
    private String id;
    private String name;
}
