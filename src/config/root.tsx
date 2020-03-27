import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import { caseReducer } from "feature/case/reducer";
import { caseSaga } from 'feature/case/saga'
import { clientReducer } from "../feature/client/reducer";
import { clientSaga } from 'feature/client/saga'
import { debtReducer } from "../feature/debt/reducer";
import { debtSaga } from 'feature/debt/saga'

export const rootReducer = () => {
    return combineReducers({
        "case": caseReducer,
        "client": clientReducer,
        "debt": debtReducer
    })
}

export function* rootSaga() {
    yield all([
        caseSaga(),
        clientSaga(),
        debtSaga()
    ])
}
