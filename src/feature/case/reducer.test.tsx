import React from 'react'
import {caseReducer} from "./reducer";
import {setCaseSummary} from "./action";
import {CaseSummary} from "../../models/case/case-summary";
import {FirstDisbursementDate} from "../../models/case/first-disbursement-date";

describe('case reducer', () => {
   const state = caseReducer(null, null)
   it('set case summary', () => {
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
      const stateWithCase = caseReducer(state, setCaseSummary(caseSummary))
      expect(stateWithCase.caseSummary).toEqual(caseSummary)
   })
})