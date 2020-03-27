import React from 'react'
import {getCaseWorker} from "./saga";
import {CaseSummary} from "../../models/case/case-summary";
import {call, put} from "redux-saga/effects";
import {restService} from "../../services/rest.service";
import {LoginResponse} from "../../models/auth/login-response";
import {getCaseSummary, setCaseSummary} from "./action";

describe('case saga', () => {
   it('handles successful case call', () => {
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

      const generator = getCaseWorker(getCaseSummary(credentials))

      const caseSummary : CaseSummary = {
         clientName: "name",
         currentMonthlyPayment: 0,
         errors: [],
         estimatedBalance: 0.0,
         firstDisbursementDate: {
            calendar: "calendar",
            ticks: 532,
            $id: "id",
         },
         isSuccess: true,
         monthlyDueOn: 23,
         nextPaymentDueOn: new Date(32),
         totalMonthlyDeposit: 34,
         $id: "id_two",
      }

      expect(generator.next().value).toEqual(
          call(restService.callCaseSummaryEndpoint, credentials.linkedApplication[0].externalId)
      )
      expect(generator.next(caseSummary).value).toEqual(
          put(setCaseSummary(caseSummary))
      )
   })

   it('handles invalid credentialsls', () => {
      // todo
   })

   it('handles failed case call', () => {
      // todo
   })
})