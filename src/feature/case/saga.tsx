import {all, call, put, takeEvery} from 'redux-saga/effects'
import {GET_CASE_PAYOFF_DATE, GET_CASE_SUMMARY, setCasePayoffDate, setCaseSummary} from "./action";
import {callCaseSummaryEndpoint, callPayoffForecast} from "../../services/rest.service";


export function * getCaseWorker(action) {
    const { payload: { caseId } } = action;
    const caseSummary = yield call(callCaseSummaryEndpoint, caseId);
    if (caseSummary && caseSummary.EstimatedBalance) {
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
            isOneTimePayment: IsOneTimePayment,
            caseId
        }
    } = action

    const { PayoffDate } = (
        yield call(callPayoffForecast,
            {
                IncreaseAmount,
                IsOneTimePayment,
                caseId
            })
    )

    if (true) { // todo validation
        yield put(setCasePayoffDate({ casePayoffDate: PayoffDate }))
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



