
package com.apprisen.apprisenapi.model.casedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ClientInformation {

    @JsonProperty("$id")
    private String id;
    private String address1;
    private String address2;
    private String cellPhone;
    private String city;
    private String emailAddress;
    private List<Object> errors;
    private String firstName;
    private String homePhone;
    private Boolean isSuccess;
    private String lastName;
    private String state;
    private String workPhone;
    private String zipCode;

}
