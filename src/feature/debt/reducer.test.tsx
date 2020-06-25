import React from 'react'
import {debtReducer} from "./reducer";
import {setDebts} from "./action";
import {CaseDebt} from "../../models/case/case-debt";

describe('debt reducer', () => {
   const CASE_DEBT : CaseDebt =  {
       AccountNumber: "TEST",
       Apr: .01,
       CreditorName:"TEST",
       CurrentBalance: 0.00,
       DebtId:"TEST",
       DebtType: 5,
       LastCreditorPaymentDate: new Date(9999),
        OriginalBalance: 0.1,
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