import React from 'react'
import {getDebtDetailWatcher, getDebtDetailWorker} from "./saga";
import {call, put, takeEvery} from 'redux-saga/effects'
import {GET_DEBTS, getDebts, setDebts} from "./action";
import {LoginResponse} from "../../models/auth/login-response";
import {callDebtDetailEndpoint} from "../../services/rest.service";

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
            application: "ChaseFFG",
            externalId: "externalId",
            $id: "$id"
         }],
         signedToken: "signedToken",
         statusCode: 5,
         userId: "userId",
         username: "username",
         $id: "$id",
      }
      const generator = getDebtDetailWorker(getDebts('externalId'))
      const caseId = 'externalId'
      expect(generator.next().value).toEqual(call(callDebtDetailEndpoint, caseId))
      expect(generator.next({caseDebts: []}).value).toEqual(
          put(setDebts([]))
      )
   })

   it('handles failed get debt', () => {
      // todo
   })
})