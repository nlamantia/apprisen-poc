import React from 'react'
import {getDebtDetailWatcher, getDebtDetailWorker} from "./saga";
import {call, takeEvery} from 'redux-saga/effects'
import {GET_DEBTS, getDebts} from "./action";
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
      const generator = getDebtDetailWorker(getDebts(credentials))
      const caseId = credentials ? credentials.LinkedApplication[1].ExternalId : "";
      expect(generator.next().value).toEqual(call(callDebtDetailEndpoint))
   })

   it('handles failed get debt', () => {
      // todo
   })
})