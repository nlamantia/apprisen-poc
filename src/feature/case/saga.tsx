import {all, call, put, takeEvery, select } from 'redux-saga/effects'
import {restService} from "../../services/rest.service";
import {GET_CASE_PAYOFF_DATE, GET_CASE_SUMMARY, setCasePayoffDate, setCaseSummary} from "./action";
import {Plugins} from "@capacitor/core";

const { Storage } = Plugins;


export function * getCaseWorker(action) {
    // const { payload: { credentials }} = action

    const state = yield select()

    const { auth: { credentials } } = state

    if (credentials && credentials !== {}) {
        const caseSummary = yield call(restService.callCaseSummaryEndpoint, credentials)
        console.log("TEST")
        if (true) { // todo validation
            yield put(setCaseSummary(caseSummary))
        } else {

        }
    } else {

        // todo handle unauthorized attempt to get case
    }    // const { payload: { credentials }} = action
}

function * getCaseSummaryWatcher() {
    console.log({e: 'watcher'})
    yield takeEvery(GET_CASE_SUMMARY, getCaseWorker)
}

export function * getCasePayoffDateForecastWorker(action) {
    const {
        payload: {
            caseNumber,
            increaseAmount: IncreaseAmount,
            isOneTimePayment: IsOneTimePayment
        }
    } = action

    const state = yield select()

    const { auth: { credentials } } = state

    if (credentials && credentials !== {}) {
        const { casePayoffDate } = (yield call
            (restService.callPayoffForecast,
                {
                    credentials,
                    caseNumber,
                    IncreaseAmount,
                    IsOneTimePayment
                }))
        if (true) { // todo validation
            yield put(setCasePayoffDate({ casePayoffDate }))
        } else {

        }
    } else {

        // todo handle unauthorized attempt to get case
    }
}

export function * getCasePayoffDateForecastWatcher() {
    yield takeEvery(GET_CASE_PAYOFF_DATE, getCasePayoffDateForecastWorker)
}

export function * caseSaga() {
    yield all([
        getCaseSummaryWatcher(),
        getCasePayoffDateForecastWatcher()
    ])
}



