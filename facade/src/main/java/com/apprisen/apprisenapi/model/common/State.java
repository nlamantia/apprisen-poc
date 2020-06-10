package com.apprisen.apprisenapi.model.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class State {
    @JsonProperty("$id")
    private String resourceId;
    private int id;
    private String name;
    private String abbreviation;
}
