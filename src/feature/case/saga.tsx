import {all, call, put, takeEvery} from 'redux-saga/effects'
import {restService} from "../../services/rest.service";
import {GET_CASE_SUMMARY, setCaseSummary} from "./action";
import {Plugins} from "@capacitor/core";

const { Storage } = Plugins;


export function * getCaseWorker(action) {
    const { payload: { credentials }} = action

    const caseId = credentials ? credentials.linkedApplication[0].externalId : "";

    if (caseId !== "") {
        const caseSummary = yield call(restService.callCaseSummaryEndpoint, caseId)
        // todo validation
        if (true) { // is valid
            yield put(setCaseSummary(caseSummary))
        } else {

        }
    } else {

        // todo handle unauthorized attempt to get case
    }
}

function * getCaseSummaryWatcher() {
    yield takeEvery(GET_CASE_SUMMARY, getCaseWorker)
}

export function * caseSaga() {
    yield all([
        getCaseSummaryWatcher(),
    ])
}



