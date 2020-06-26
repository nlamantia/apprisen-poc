package com.apprisen.apprisenapi.dto.mock;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UpdateUserDto {
    @NotNull
    private Integer id;
    @NotNull
    private String lastName;
    @NotNull
    private String firstName;
    @NotNull
    private String middleInitial;
    @NotNull
    private String address1;
    @NotNull
    private String address2;
    @NotNull
    private String city;
    @NotNull
    private String state;
    @NotNull
    private String zipCode;
    @NotNull
    private String email;
    @NotNull
    private String homePhone;
    @NotNull
    private String cellPhone;
    @NotNull
    private String workPhone;
}
