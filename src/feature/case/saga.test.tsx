import React from 'react'
import {getCasePayoffDateForecastWatcher, getCasePayoffDateForecastWorker, getCaseWorker} from "./saga";
import {CaseSummary} from "../../models/case/case-summary";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {LoginResponse} from "../../models/auth/login-response";
import {GET_CASE_PAYOFF_DATE, getCasePayoffDate, getCaseSummary, setCasePayoffDate, setCaseSummary} from "./action";
import {callCaseSummaryEndpoint, callPayoffForecast} from "../../services/rest-service";

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

      const generator = getCaseWorker({payload: { caseId: 1 }})

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
          call(callCaseSummaryEndpoint as any, 1)
      )
      expect(generator.next(caseSummary).value).toEqual(
          put(setCaseSummary(caseSummary))
      )
   })

   it('Waits to get payoff date', () => {
      const generator = getCasePayoffDateForecastWatcher()
      expect(generator.next().value).toEqual(
          takeEvery(GET_CASE_PAYOFF_DATE, getCasePayoffDateForecastWorker)
      );
   })

   it('Grabs forecast date', () => {
      const credentials = { 'erik' : 'was here'}
      const caseNumber = 5
      const increaseAmount = 6
      const isOneTimePayment = true
      const generator = getCasePayoffDateForecastWorker(getCasePayoffDate({
         caseNumber,
         increaseAmount,
         isOneTimePayment
      }))

      expect(generator.next().value).toEqual(
          call(callPayoffForecast,
              {
                 IncreaseAmount: increaseAmount,
                 IsOneTimePayment: isOneTimePayment
              }
          )
      )

      const payoffDate = "an arbritrary string, should be a date"

      expect(generator.next({ payoffDate } as any).value).toEqual(
         put(setCasePayoffDate({ casePayoffDate: payoffDate }))
      )

   })
})