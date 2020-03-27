import { put, takeEvery, all, call } from 'redux-saga/effects'
import { restService } from "../../services/rest.service";
import {GET_DEBTS, setDebts} from "./action";


export function * getDebtDetailWorker(action) {
    const { payload: { credentials } } = action

    const caseId = credentials ? credentials.linkedApplication[0].externalId : "";

    const debtDetail = yield call(restService.callDebtDetailEndpoint, caseId)

    if (debtDetail.errors.length == 0) { // is valid
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



