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
   const casePayoffDateString = "1970-01-19T08:41:30.297Z"
   const casePayoffDateUnix = 1586490297
   const firstDisbursementDateTicks = 637220870950000000 ;
   const firstDisbursementDateUnix = 1586490295;
   global.Date.now = () => 1586490296

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
       expect(casePayoffDateSelector(stateWithBoth)).toEqual(casePayoffDateString)
   })

   it('gets first payment date', () => {
      expect(caseFirstPaymentDateSelector(stateWithBoth)).toEqual(firstDisbursementDateTicks)
   })

   it('gets casePayoff date in unix time', () => {
      expect(casePayoffDateUnixTimeSelector(stateWithBoth)).toEqual(casePayoffDateUnix)
   })

   it('gets firstPayment date in unix time', () => {
      expect(caseFirstPaymentDateUnixTimeSelector(stateWithBoth)).toEqual(firstDisbursementDateUnix)
   })

   it('gets progress from beginning to projected end of case', () => {
      expect(caseProgressTracker(stateWithBoth)).toEqual(.5)
   })
})