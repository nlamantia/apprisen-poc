import { connectRouter } from 'connected-react-router';
import { caseReducer } from "feature/case/reducer";
import { caseSaga } from 'feature/case/saga';
import { clientSaga } from 'feature/client/saga';
import { debtSaga } from 'feature/debt/saga';
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { authReducer } from "../feature/auth/reducer";
import { authSaga } from "../feature/auth/saga";
import { clientReducer } from "../feature/client/reducer";
import { commonReducer } from "../feature/common/reducer";
import { contactReducer } from "../feature/contact/reducer";
import { contactSaga } from "../feature/contact/saga";
import { debtReducer } from "../feature/debt/reducer";
import { paymentReducer } from "../feature/payment/reducer";
import { paymentSaga } from "../feature/payment/saga";
import {toastsReducer} from "react-toastify-redux";

export const rootReducer = (history) => {
    return combineReducers({
        "case": caseReducer,
        "client": clientReducer,
        "debt": debtReducer,
        "auth": authReducer,
        "payment": paymentReducer,
        "common": commonReducer,
        "contact": contactReducer,
        "router": connectRouter(history),
        "toasts": toastsReducer
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
