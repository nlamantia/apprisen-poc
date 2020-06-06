package com.apprisen.apprisenapi.model.casedata;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class WebPaymentRequest {

    private long clientNumber;
    private long caseNumber;
    @JsonFormat
            (shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date effectiveDate;
    private String routingNumber;
    private String accountNumber;
    private long amount;
    private String bankAccountType;
    private String primaryNameOnAccount;
    private String clientComments;

}
