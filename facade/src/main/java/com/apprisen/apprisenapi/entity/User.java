package com.apprisen.apprisenapi.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue
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
