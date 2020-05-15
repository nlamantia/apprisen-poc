import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import { caseReducer } from "feature/case/reducer";
import { caseSaga } from 'feature/case/saga'
import { clientReducer } from "../feature/client/reducer";
import { clientSaga } from 'feature/client/saga'
import { debtReducer } from "../feature/debt/reducer";
import { debtSaga } from 'feature/debt/saga'
import {authReducer} from "../feature/auth/reducer";
import {authSaga} from "../feature/auth/saga";
import {paymentReducer} from "../feature/payment/reducer";
import {paymentSaga} from "../feature/payment/saga";
import {commonReducer} from "../feature/common/reducer";
import {contactSaga} from "../feature/contact/saga";
import {contactReducer} from "../feature/contact/reducer";

export const rootReducer = () => {
    return combineReducers({
        "case": caseReducer,
        "client": clientReducer,
        "debt": debtReducer,
        "auth": authReducer,
        "payment": paymentReducer,
        "common": commonReducer
        "contact": contactReducer
    })
}

export function* rootSaga() {
    yield all([
        caseSaga(),
        clientSaga(),
        debtSaga(),
        authSaga(),
        paymentSaga(),
        contactSaga()
    ])
}
