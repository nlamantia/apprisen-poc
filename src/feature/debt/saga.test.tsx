import React from 'react'
import {getDebtDetailWatcher, getDebtDetailWorker} from "./saga";
import {call, takeEvery} from 'redux-saga/effects'
import {GET_DEBTS, getDebts} from "./action";
import {LoginResponse} from "../../models/auth/login-response";
import {restService} from "../../services/rest.service";

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
      const caseId = credentials ? credentials.linkedApplication[1].externalId : "";
      expect(generator.next().value).toEqual(call(restService.callDebtDetailEndpoint, caseId))
   })

   it('handles failed get debt', () => {
      // todo
   })
})