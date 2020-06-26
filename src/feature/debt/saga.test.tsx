import React from 'react'
import {getDebtDetailWatcher, getDebtDetailWorker} from "./saga";
import {call, put, takeEvery} from 'redux-saga/effects'
import {GET_DEBTS, getDebts, setDebts} from "./action";
import {callDebtDetailEndpoint} from "../../services/rest-service";

describe('debt saga', () => {
   it('waits for  GET_DEBTS', () => {
      const generator = getDebtDetailWatcher()
      expect(generator.next().value).toEqual(
          takeEvery(GET_DEBTS, getDebtDetailWorker)
      )
   });

   it('handles successful get debt', () => {
      const generator = getDebtDetailWorker(getDebts('externalId'))
      const caseId = 'externalId'
      expect(generator.next().value).toEqual(call(callDebtDetailEndpoint, caseId))
      expect(generator.next({CaseDebts: []}).value).toEqual(
          put(setDebts([]))
      )
   })

});