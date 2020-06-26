import {all, call, put, takeEvery} from 'redux-saga/effects'
import {callDebtDetailEndpoint} from "../../services/rest-service";
import {GET_DEBTS, GET_SELECTED_DEBT, selectDebt, setDebts} from "./action";
import {Storage} from "@capacitor/core";
import {CaseDebt} from "../../models/case/case-debt";

export function * getDebtDetailWorker(action) {
    const { payload: { caseId } } = action;
    const debtDetail = yield call(callDebtDetailEndpoint, caseId);

    if (debtDetail && debtDetail.caseDebts) { // is valid
        const { caseDebts } = debtDetail;
        const byBalance = (debt1: CaseDebt, debt2: CaseDebt) => debt2.currentBalance - debt1.currentBalance;
        yield put(setDebts(caseDebts.sort(byBalance)));
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
