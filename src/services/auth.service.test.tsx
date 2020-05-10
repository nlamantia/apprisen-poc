import React from "react";
import {isAuthenticated} from "./auth.service";

global.Date.now = () => 1589127004702

describe('Auth service tests', () => {
   describe('isAuthenticated tests', () => {
       it('still authenticated', () => {
           const creds = {
               email: 'patricia.lamkin@apprisen.com',
               errors: [],
               expiresOn: '15991270047024538',
               firstName: 'demo',
               isSuccess: true,
               signedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           expect(isAuthenticated(JSON.stringify(creds))).toBeTruthy();
       });

       it('not still authenticated', () => {
           const creds = {
               email: 'patricia.lamkin@apprisen.com',
               errors: [],
               expiresOn: '15791270047024538',
               firstName: 'demo',
               isSuccess: true,
               signedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           expect(isAuthenticated(JSON.stringify(creds))).toBeFalsy();
       });

       it('just expired', () => {
           const creds = {
               email: 'patricia.lamkin@apprisen.com',
               errors: [],
               expiresOn: '15891270047024538',
               firstName: 'demo',
               isSuccess: true,
               signedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           expect(isAuthenticated(JSON.stringify(creds))).toBeFalsy();
       });

       it('null creds', () => {
           expect(isAuthenticated(null)).toBeFalsy();
       });

       it('undefined creds', () => {
           expect(isAuthenticated(undefined)).toBeFalsy();
       });

       it('null signed token', () => {
           const creds = {
               email: 'patricia.lamkin@apprisen.com',
               errors: [],
               expiresOn: '15891270047024538',
               firstName: 'demo',
               isSuccess: true,
               signedToken: null,
               $id: '1'
           };
           expect(isAuthenticated(JSON.stringify(creds))).toBeFalsy();
       });

       it('undefined signed token', () => {
           const creds = {
               email: 'patricia.lamkin@apprisen.com',
               errors: [],
               expiresOn: '15891270047024538',
               firstName: 'demo',
               isSuccess: true,
               signedToken: undefined,
               $id: '1'
           };
           expect(isAuthenticated(JSON.stringify(creds))).toBeFalsy();
       });

       it('null expires on', () => {
           const creds = {
               email: 'patricia.lamkin@apprisen.com',
               errors: [],
               expiresOn: null,
               firstName: 'demo',
               isSuccess: true,
               signedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           expect(isAuthenticated(JSON.stringify(creds))).toBeFalsy();
       });

       it('undefined expires on', () => {
           const creds = {
               email: 'patricia.lamkin@apprisen.com',
               errors: [],
               expiresOn: undefined,
               firstName: 'demo',
               isSuccess: true,
               signedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           expect(isAuthenticated(JSON.stringify(creds))).toBeFalsy();
       });

       it('expires on epoch', () => {
           const creds = {
               email: 'patricia.lamkin@apprisen.com',
               errors: [],
               expiresOn: 0,
               firstName: 'demo',
               isSuccess: true,
               signedToken: 'ynvjmC+M302bfvWSx2qztgM6lEoOWUcmMi1XmiX5sh8HvJ2AsE0d8J7v6UwpXcbvcobNOxzLF/dlmIL2q+F0KSYKEEUCP+8txdhdhqRBufUnO28kiadsLIV6+MD77hVdiefRRmUThd9K2sTzefnGaD1L+BaERHrQHuU5w6AQyf0=',
               $id: '1'
           };
           expect(isAuthenticated(JSON.stringify(creds))).toBeFalsy();
       });
   });
});