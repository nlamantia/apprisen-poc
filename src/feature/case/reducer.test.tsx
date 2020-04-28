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

// todo test loading flags?

describe('Case time selectors', () => {
   // todo convert to const case
   const casePayoffDateString = "2024-07-24T04:00:00.000Z"
   const casePayoffDateUnix = 1721793600000
   const firstDisbursementDateTicks = 13209012000000000;
   const firstDisbursementDateUnix = 1320901200000;

   const initialState = caseReducer(undefined, null);

   global.Date.now = () => 1588107303088

   const stateWithPayoffDate = caseReducer(initialState, setCasePayoffDate(
             {casePayoffDate: casePayoffDateString}
   ))
   const stateWithBoth = caseReducer(stateWithPayoffDate, setCaseSummary(
       {
          ...caseSummary,
          firstDisbursementDate: {
              ...caseSummary.firstDisbursementDate,
              ticks: firstDisbursementDateTicks
          }
       }
   ))

   it('gets casePayoff date', () => {
      const overallState = {
         case: stateWithBoth
      };
       expect(casePayoffDateSelector(overallState)).toEqual(casePayoffDateString)
   })

   it('handles null casePayoff', () => {
      const overallState = {
         case: initialState
      };
      console.log("Overall state: " + JSON.stringify(overallState));
      expect(casePayoffDateSelector(overallState)).toEqual("")
   })

   it('gets casePayoff date in unix time', () => {
      console.log(JSON.stringify(stateWithBoth))
      console.log(new Date("2024-07-24T04:00:00.000Z").getTime());
      const overallState = {
         case: stateWithBoth
      };
      expect(casePayoffDateUnixTimeSelector(overallState)).toEqual(casePayoffDateUnix)
   })

   it('gets casePayoff date in unix time, handles null', () => {
      const overallState = {
         case: initialState
      };
      expect(casePayoffDateUnixTimeSelector(overallState)).toEqual(null)
   })

   it('gets first payment date', () => {
      const overallState = {
         case: stateWithBoth
      };
      expect(caseFirstPaymentDateSelector(overallState)).toEqual(firstDisbursementDateTicks)
   })

    it('gets first payment date, handles null', () => {
       const overallState = {
          case: initialState
       };
        expect(caseFirstPaymentDateSelector(overallState)).toEqual(null)
    })

   it('gets firstPayment date in unix time', () => {
      const overallState = {
         case: stateWithBoth
      };
      console.log(JSON.stringify(overallState))
      expect(caseFirstPaymentDateUnixTimeSelector(overallState)).toEqual(firstDisbursementDateUnix)
   })

   it('gets firstPayment date in unix time, handles null', () => {
      const overallState = {
         case: initialState
      };
      expect(caseFirstPaymentDateUnixTimeSelector(overallState)).toEqual(null)
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
             firstDisbursementDate: {
                ...caseSummary.firstDisbursementDate,
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