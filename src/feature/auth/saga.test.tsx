import React from 'react'
import {loginWatcher, loginWorker} from "./saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {LOGIN, setCredentials, setLoginStatus} from "./action";
import {callLoginEndpoint} from "../../services/rest.service";
import {Plugins} from "@capacitor/core";
import {LoginResponse} from "../../models/auth/login-response";
const { Storage } = Plugins;

describe('auth saga', () => {
   it('Watcher calls worker', () => {
      const generator = loginWatcher()
      expect(generator.next().value).toEqual(
          takeEvery(LOGIN, loginWorker)
      )
   })

   it('handles successful login call', () => {
      const credential = {
         username: "TEST",
         password: "TEST"
      }

      const generator = loginWorker({payload: { credential }})
      const loginResponse : LoginResponse = {
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

      expect(generator.next().value).toEqual(
          call(callLoginEndpoint, credential)
      )

      expect(generator.next(loginResponse).value).toEqual(
          put(setLoginStatus({loginState: "ACTIVE", message: "PENDING"}))
      )


      expect(generator.next().value).toEqual(
          call(Storage.set, ({
             key: 'credentials',
             value: JSON.stringify(loginResponse)
          }))
      )

      expect(generator.next().value).toEqual(
          put(setCredentials(loginResponse))
      )

      expect(generator.next().value).toEqual(
          put(setLoginStatus({loginState: "INACTIVE", message: "SUCCESS"}))
      )
   })

   it('handles failed login call', () => {
      const credential = {
         username: "TEST",
         password: "TEST"
      }

      const generator = loginWorker({payload: { credential }})
      const loginResponse = {
         loginResponse: false,
         signedToken: false,
         username: false,
         expiresOn: false
      }

      expect(generator.next(loginResponse).value).toEqual(
         call(callLoginEndpoint, credential)
      )

      expect(generator.next(loginResponse).value).toEqual(
          put(setLoginStatus({loginState: "ACTIVE", message: "PENDING"}))
      )

      expect(generator.next().value).toEqual(
          put(setLoginStatus({loginState: "INACTIVE", message: "FAILURE"}))
      )
   })

   // todo test logout
})