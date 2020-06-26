package com.apprisen.apprisenapi.model.client;

import com.apprisen.apprisenapi.model.common.Error;
import com.apprisen.apprisenapi.model.common.State;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ClientDataResponse {
    @JsonProperty("$id")
    private String id;
    private List<BankAccountType> bankAccountTypes = new ArrayList<>();
    private List<State> states = new ArrayList<>();
    private int dmpCaseId;
    @JsonProperty("IsSuccess")
    private boolean isSuccess;
    private List<Error> errors = new ArrayList<>();
}
