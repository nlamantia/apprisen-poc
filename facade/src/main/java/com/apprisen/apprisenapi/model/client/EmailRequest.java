package com.apprisen.apprisenapi.model.client;

import lombok.Data;

import java.util.ArrayList;

@Data
public class EmailRequest {
    private ArrayList<String> recipients;
    private String subject;
    private String body;
}
