package com.apprisen.apprisenapi.dto.mock;

import lombok.Data;

@Data
public class UserDto {
    private Integer id;
    private String lastName;
    private String firstName;
    private String middleInitial;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String zipCode;
    private String email;
    private String homePhone;
    private String cellPhone;
    private String workPhone;
}
