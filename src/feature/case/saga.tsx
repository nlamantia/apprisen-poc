import {all, call, put, select, takeEvery} from 'redux-saga/effects'
import {GET_CASE_PAYOFF_DATE, GET_CASE_SUMMARY, setCasePayoffDate, setCaseSummary} from "./action";
import {Plugins} from "@capacitor/core";
import {callCaseSummaryEndpoint, callPayoffForecast} from "../../services/rest.service";
const { Storage } = Plugins;


export function * getCaseWorker() {
    const caseSummary = yield call(callCaseSummaryEndpoint)
    if (caseSummary && caseSummary.estimatedBalance) {
        console.log(JSON.stringify(caseSummary));
        yield put(setCaseSummary(caseSummary))
    }
}

function * getCaseSummaryWatcher() {
    yield takeEvery(GET_CASE_SUMMARY, getCaseWorker)
}

export function * getCasePayoffDateForecastWorker(action) {
    const {
        payload: {
            increaseAmount: IncreaseAmount,
            isOneTimePayment: IsOneTimePayment
        }
    } = action

    const { payoffDate } = (
        yield call(callPayoffForecast,
            {
                IncreaseAmount,
                IsOneTimePayment
            })
    )

    if (true) { // todo validation
        yield put(setCasePayoffDate({ casePayoffDate: payoffDate }))
    } else {

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



