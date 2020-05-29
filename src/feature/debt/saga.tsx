import {all, call, put, takeEvery} from 'redux-saga/effects'
import {callDebtDetailEndpoint} from "../../services/rest.service";
import {GET_DEBTS, GET_SELECTED_DEBT, selectDebt, setDebts} from "./action";
import {Storage} from "@capacitor/core";

export function * getDebtDetailWorker(action) {
    const { payload: { caseId } } = action;
    const debtDetail = yield call(callDebtDetailEndpoint, caseId);
    console.log("Debt detail worker: " + JSON.stringify(debtDetail));

    if (debtDetail && debtDetail.caseDebts) { // is valid
        const { caseDebts } = debtDetail
        yield put(setDebts(caseDebts))
    }
}

export function * getDebtDetailWatcher() {
    yield takeEvery(GET_DEBTS, getDebtDetailWorker)
}

export function * getSelectedDebtIdWorker(action) {
    const debtId = (yield Storage.get({key: 'selectedDebtId'})).value;

    if (debtId) {
        yield put(selectDebt(debtId));
    } else {
        throw new Error("No selected debt ID found");
    }
}

export function * getSelectedDebtIdWatcher() {
    yield takeEvery(GET_SELECTED_DEBT, getSelectedDebtIdWorker);
}

export function * debtSaga() {
    yield all([
        getDebtDetailWatcher(),
        getSelectedDebtIdWatcher()
    ])
}
