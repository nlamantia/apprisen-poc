import React from 'react'
import {debtReducer} from "./reducer";
import {setDebts} from "./action";
import {CaseDebt} from "../../models/case/case-debt";

describe('debt reducer', () => {
   const CASE_DEBT : CaseDebt =  {
       accountNumber: "TEST",
       apr: .01,
       creditorName:"TEST",
       currentBalance: 0.00,
       debtId:"TEST",
       debtType: 5,
       lastCreditorPaymentDate: new Date(9999),
        originalBalance: 0.1,
        $id:"TEST",
   }

   const state = debtReducer(null,  null)
   it('handles set debts', () => {
       const stateAfterSetSuccess = debtReducer(state, setDebts([CASE_DEBT]))
   })

   it('handles select debt', () => {
      // todo
   })

})