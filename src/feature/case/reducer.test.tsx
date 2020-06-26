import React from 'react'
import {
   caseFirstPaymentDateSelector, caseFirstPaymentDateUnixTimeSelector,
   casePayoffDateSelector,
   casePayoffDateUnixTimeSelector, caseProgressTracker,
   caseReducer
} from "./reducer";
import {setCasePayoffDate, setCaseSummary} from "./action";
import {CaseSummary} from "../../models/case/case-summary";

const initialState = caseReducer(null, null)
const caseSummary : CaseSummary = {
   ClientName: "name",
   CurrentMonthlyPayment: 0,
   CurrentTrustBalance: 0,
   Errors: [],
   EstimatedBalance: 0.0,
   FirstDisbursementDate: {
      calendar: "calendar",
      ticks: 532,
      $id: "id",
   },
   IsSuccess: true,
   MonthlyDueOn: 23,
   NextPaymentDueOn: new Date(32),
   TotalMonthlyDeposit: 34,
   $id: "id_two",
}
const stateWithCase = caseReducer(initialState, setCaseSummary(caseSummary))

describe('case reducer', () => {
   it('set case summary', () => {
      expect(stateWithCase.caseSummary).toEqual(caseSummary)
   })
   it('set case summary', () => {
      const stateWithCase = caseReducer(initialState, setCaseSummary(caseSummary))
      expect(stateWithCase.caseSummary).toEqual(caseSummary)
   })
   it('let\'s you set the case payoff date\'', () => {
      const expected = "date"
      const { casePayoffDate: actual } = caseReducer(initialState, setCasePayoffDate({ casePayoffDate: expected }))
      expect(actual).toEqual(expected)
   })
})

describe('Case time selectors', () => {
   const CASE_PAYOFF_DATE_STRING = "2024-07-24T04:00:00.000Z"
   const CASE_PAYOFF_DATE_UNIX = 1721793600000
   const FIRST_DISBURSEMENT_DATE_TICKS = 13209012000000000;
   const FIRST_DISBURSEMENT_DATE_UNIX = 1320901200000;

   const initialState = caseReducer(undefined, null);

   global.Date.now = () => 1588107303088

   const stateWithPayoffDate = caseReducer(initialState, setCasePayoffDate(
             {casePayoffDate: CASE_PAYOFF_DATE_STRING}
   ))
   const stateWithBoth = caseReducer(stateWithPayoffDate, setCaseSummary(
       {
          ...caseSummary,
          FirstDisbursementDate: {
              ...caseSummary.FirstDisbursementDate,
              ticks: FIRST_DISBURSEMENT_DATE_TICKS
          }
       }
   ))

   it('gets casePayoff date', () => {
      const overallState = {
         case: stateWithBoth
      };
       expect(casePayoffDateSelector(overallState)).toEqual(CASE_PAYOFF_DATE_STRING)
   })

   it('handles null casePayoff', () => {
      const overallState = {
         case: initialState
      };
      expect(casePayoffDateSelector(overallState)).toEqual("")
   })

   it('gets casePayoff date in unix time', () => {
      const overallState = {
         case: stateWithBoth
      };
      expect(casePayoffDateUnixTimeSelector(overallState)).toEqual(CASE_PAYOFF_DATE_UNIX)
   })

   it('gets casePayoff date in unix time, handles null', () => {
      const overallState = {
         case: initialState
      };
      expect(casePayoffDateUnixTimeSelector(overallState)).toEqual(-1)
   })

   it('gets first payment date', () => {
      const overallState = {
         case: stateWithBoth
      };
      expect(caseFirstPaymentDateSelector(overallState)).toEqual(FIRST_DISBURSEMENT_DATE_TICKS)
   })

    it('gets first payment date, handles null', () => {
       const overallState = {
          case: initialState
       };
        expect(caseFirstPaymentDateSelector(overallState)).toEqual(-1)
    })

   it('gets firstPayment date in unix time', () => {
      const overallState = {
         case: stateWithBoth
      };
      expect(caseFirstPaymentDateUnixTimeSelector(overallState)).toEqual(FIRST_DISBURSEMENT_DATE_UNIX)
   })

   it('gets firstPayment date in unix time, handles null', () => {
      const overallState = {
         case: initialState
      };
      expect(caseFirstPaymentDateUnixTimeSelector(overallState)).toEqual(-1)
   })

   it('gets progress from beginning to projected end of case', () => {
      const overallState = {
         case: stateWithBoth
      };
      expect(caseProgressTracker(overallState)).toBeCloseTo(.666)
   })

   it('gets progress null first and payoff ticks', () => {
      const overallState = {
         case: initialState
      };
      expect(caseProgressTracker(overallState)).toEqual(-1)
   });

   it('gets progress null first ticks', () => {
      const overallState = {
         case: stateWithPayoffDate
      };
      expect(caseProgressTracker(overallState)).toEqual(-1)
   });

   it('gets progress null ticks non-null firstDisbursementDate', () => {
      const myState = caseReducer(stateWithPayoffDate, setCaseSummary(
          {
             ...caseSummary,
             FirstDisbursementDate: {
                ...caseSummary.FirstDisbursementDate,
                ticks: undefined
             }
          }
      ))
      const overallState = {
         case: myState
      };
      expect(caseProgressTracker(overallState)).toEqual(-1)
   });
})