import React from 'react'
import {authReducer} from "./reducer";
import {setCredentials, setLoginStatus} from "./action";
import {LoginStatus} from "../../models/auth/loginStatus";
import {LoginResponse} from "../../models/auth/login-response";

describe('auth reducer', () => {
   const state = authReducer(null, null)
   it('handles set credentials', () => {
       const credentials : LoginResponse = {
           email: "email",
           errors: [],
           expiresOn: "expiresOn",
           firstName: "firstName",
           isSuccess: true,
           lastName: "lastName",
           linkedApplication: [{
               application: "application",
               externalId: "externalId",
               $id: "$id"
           }],
           signedToken: "signedToken",
           statusCode: 5,
           userId: "userId",
           username: "username",
           $id: "$id",
       }
       const stateWithCredentials = authReducer(state, setCredentials(credentials))
       expect(stateWithCredentials.credentials).toEqual(credentials)
   })

   it('handles set login status', () => {
       const loginStatus : LoginStatus  = { loginState: "ACTIVE", message: "SUCCESS"}
       const stateWithCredentials = authReducer(state, setLoginStatus(loginStatus))
       expect(stateWithCredentials.loginStatus).toEqual(loginStatus)
   })
})