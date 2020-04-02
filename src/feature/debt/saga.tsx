import {put, takeEvery, all, call, select} from 'redux-saga/effects'
import { restService } from "../../services/rest.service";
import {GET_DEBTS, setDebts} from "./action";


export function * getDebtDetailWorker(action) {
    const state = yield select()

    const { auth: { credentials } } = state

    // todo get case id from auth service
    const caseId = credentials ? credentials.linkedApplication[1].externalId : "";

    const debtDetail = yield call(restService.callDebtDetailEndpoint, credentials)

    if (debtDetail) { // is valid
        const { caseDebts } = debtDetail
        yield put(setDebts(caseDebts))
    } else {

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



