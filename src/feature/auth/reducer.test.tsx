import React from 'react'
import {authReducer} from "./reducer";
import {setCredentials, setLoginStatus} from "./action";
import {LoginRequest} from "../../models/auth/login-request";
import {LoginStatus} from "../../models/auth/loginStatus";

describe('auth reducer', () => {
   const state = authReducer(null, null)
   it('handles set credentials', () => {
       const credentials : LoginRequest = { username: "", password: ""}
       const stateWithCredentials = authReducer(state, setCredentials(credentials))
       expect(stateWithCredentials.credentials).toEqual(credentials)
   })

   it('handles set login status', () => {
       const loginStatus : LoginStatus  = { loginState: "ACTIVE", message: "SUCCESS"}
       const stateWithCredentials = authReducer(state, setLoginStatus(loginStatus))
       expect(stateWithCredentials.loginStatus).toEqual(loginStatus)
   })
})