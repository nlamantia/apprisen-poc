
package com.apprisen.apprisenapi.model.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LinkedApplication {

    @JsonProperty("$id")
    private String id;
    private String application;
    private long externalId;

}
