import {all, call, put, takeEvery} from 'redux-saga/effects'
import {callDebtDetailEndpoint} from "../../services/rest.service";
import {GET_DEBTS, setDebts} from "./action";

export function * getDebtDetailWorker(action) {
    const debtDetail = yield call(callDebtDetailEndpoint)

    if (debtDetail) { // is valid
        const { caseDebts } = debtDetail
        yield put(setDebts(caseDebts))
    } else {
        // todo handle this
    }
}

export function * getDebtDetailWatcher() {
    yield takeEvery(GET_DEBTS, getDebtDetailWorker)
}

export function * debtSaga() {
    yield all([
        getDebtDetailWatcher()
    ])
}



