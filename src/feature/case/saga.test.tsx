import React from 'react'
import {getCasePayoffDateForecastWatcher, getCasePayoffDateForecastWorker, getCaseWorker} from "./saga";
import {CaseSummary} from "../../models/case/case-summary";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {restService} from "../../services/rest.service";
import {LoginResponse} from "../../models/auth/login-response";
import {GET_CASE_PAYOFF_DATE, getCasePayoffDate, getCaseSummary, setCasePayoffDate, setCaseSummary} from "./action";

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
          call(restService.callCaseSummaryEndpoint as any, credentials.linkedApplication[0].externalId)
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

      const state = { auth: { credentials }}
      expect(generator.next(state as any).value).toEqual(
          select()
      );
      expect(generator.next(
          {
             auth: { credentials }
          } as any
      ).value).toEqual(
          call(restService.callPayoffForecast,
              {
                 credentials,
                 caseNumber,
                 IncreaseAmount: increaseAmount,
                 IsOneTimePayment: isOneTimePayment
              }
          )
      )

      const casePayoffDate = "an arbritrary string, should be a date" // todo validate string is date

      expect(generator.next({ casePayoffDate } as any).value).toEqual(
         put(setCasePayoffDate({ casePayoffDate }))
      )
   })
})