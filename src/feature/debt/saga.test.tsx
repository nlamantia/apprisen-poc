import React from 'react'
import {getDebtDetailWatcher, getDebtDetailWorker} from "./saga";
import {takeEvery} from 'redux-saga/effects'
import {GET_DEBTS, getDebts} from "./action";
import {LoginResponse} from "../../models/auth/login-response";

describe('debt saga', () => {
   it('waits for  GET_DEBTS', () => {
      const generator = getDebtDetailWatcher()
      expect(generator.next().value).toEqual(
          takeEvery(GET_DEBTS, getDebtDetailWorker)
      )
   })

   it('handles successful get debt', () => {
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
      const generator = getDebtDetailWorker(getDebts(credentials))
      expect(generator.next().vaue).toEqua
   })

   it('handles failed get debt', () => {
      // todo
   })
})