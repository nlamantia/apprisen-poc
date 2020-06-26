import React from "react";
import {isAuthenticated} from "./auth.service";
import {LoginResponse} from "../models/auth/login-response";

global.Date.now = () => 1589127004702

describe('Auth service tests', () => {
   describe('isAuthenticated tests', () => {
       it('still authenticated', done => {
           const creds : LoginResponse = {
               LastName: "", LinkedApplication: [], StatusCode: 0, UserId: "", Username: "",
               Email: 'patricia.lamkin@apprisen.com',
               Errors: [],
               ExpiresOn: '15991270047024538',
               FirstName: 'demo',
               IsSuccess: true,
               SignedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           isAuthenticated(creds).then(res => {
               expect((res)).toBeTruthy();
               done()
           }).catch(err => done(err));
       });

       it('not still authenticated', done => {
           const creds : LoginResponse = {
               LastName: "", LinkedApplication: [], StatusCode: 0, UserId: "", Username: "",
               Email: 'patricia.lamkin@apprisen.com',
               Errors: [],
               ExpiresOn: '15791270047024538',
               FirstName: 'demo',
               IsSuccess: true,
               SignedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           try {
           isAuthenticated(creds).then(res => {
               expect((res)).toBeFalsy();
               done()
           })} catch(e) {
                done(e)
           }
       });

       it('just expired', done => {
           const creds : LoginResponse = {
               LastName: "", LinkedApplication: [], StatusCode: 0, UserId: "", Username: "",
               Email: 'patricia.lamkin@apprisen.com',
               Errors: [],
               ExpiresOn: '15891270047024538',
               FirstName: 'demo',
               IsSuccess: true,
               SignedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           try {
           isAuthenticated(creds).then(res => {
               expect((res)).toBeFalsy();
               done()
           })} catch(e) {
                done(e)
           }
       });

       it('null creds', done => {
           const creds = null
           try {
           isAuthenticated(creds).then(res => {
               expect((res)).toBeFalsy();
               done()
           })} catch(e) {
                done(e)
           }
       });

       it('null signed token', done => {
           const creds : LoginResponse = {
               LastName: "", LinkedApplication: [], StatusCode: 0, UserId: "", Username: "",
               Email: 'patricia.lamkin@apprisen.com',
               Errors: [],
               ExpiresOn: '15891270047024538',
               FirstName: 'demo',
               IsSuccess: true,
               SignedToken: null,
               $id: '1'
           };
           try {
           isAuthenticated(creds).then(res => {
               expect((res)).toBeFalsy();
               done()
           })} catch(e) {
                done(e)
           }
       });

       it('undefined signed token', done => {
           const creds : LoginResponse = {
               LastName: "", LinkedApplication: [], StatusCode: 0, UserId: "", Username: "",
               Email: 'patricia.lamkin@apprisen.com',
               Errors: [],
               ExpiresOn: '15891270047024538',
               FirstName: 'demo',
               IsSuccess: true,
               SignedToken: undefined,
               $id: '1'
           };
           try {
           isAuthenticated(creds).then(res => {
               expect((res)).toBeFalsy();
               done()
           })} catch(e) {
                done(e)
           }
       });

       it('null expires on', done => {
           const creds : LoginResponse = {
               LastName: "", LinkedApplication: [], StatusCode: 0, UserId: "", Username: "",
               Email: 'patricia.lamkin@apprisen.com',
               Errors: [],
               ExpiresOn: null,
               FirstName: 'demo',
               IsSuccess: true,
               SignedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           try {
           isAuthenticated(creds).then(res => {
               expect((res)).toBeFalsy();
               done()
           })} catch(e) {
                done(e)
           }
       });

       it('undefined expires on', done => {
           const creds : LoginResponse = {
               LastName: "", LinkedApplication: [], StatusCode: 0, UserId: "", Username: "",
               Email: 'patricia.lamkin@apprisen.com',
               Errors: [],
               ExpiresOn: undefined,
               FirstName: 'demo',
               IsSuccess: true,
               SignedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           try {
           isAuthenticated(creds).then(res => {
               expect((res)).toBeTruthy();
               done()
           })} catch(e) {
                done(e)
           }
       });

       it('expires on epoch', done => {
           const creds : LoginResponse = {
               LastName: "", LinkedApplication: [], StatusCode: 0, UserId: "", Username: "",
               Email: 'patricia.lamkin@apprisen.com',
               Errors: [],
               ExpiresOn: "0",
               FirstName: 'demo',
               IsSuccess: true,
               SignedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           try {
           isAuthenticated(creds).then(res => {
               expect((res)).toBeFalsy();
               done()
           })} catch(e) {
                done(e)
           }
       });
   });
});