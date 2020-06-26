import React from 'react'
import {authReducer} from "./reducer";
import {setCredentials } from "./action";
import {LoginResponse} from "../../models/auth/login-response";

describe('auth reducer', () => {
   const state = authReducer(null, null)
   it('handles set credentials', () => {
       const credentials : LoginResponse = {
           Email: "email",
           Errors: [],
           ExpiresOn: "expiresOn",
           FirstName: "firstName",
           IsSuccess: true,
           LastName: "lastName",
           LinkedApplication: [{
               Application: "application",
               ExternalId: "externalId",
               $id: "$id"
           }],
           SignedToken: "signedToken",
           StatusCode: 5,
           UserId: "userId",
           Username: "username",
           $id: "$id",
       }
       const stateWithCredentials = authReducer(state, setCredentials(credentials))
       expect(stateWithCredentials.credentials).toEqual(credentials)
   })
})