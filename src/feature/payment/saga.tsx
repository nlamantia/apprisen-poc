import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import {
    GET_CLIENT_ACCOUNT_DATA,
    GET_PAYMENT_HISTORY,
    MAKE_PAYMENT,
    setClientAccountData,
    setConfirmation,
    setPaymentHistory,
    setPaymentStatus
} from "./action";
import {callGetClientData, callMakePayment, callPaymentHistory} from "../../services/rest-service";
import {getClientId} from "../../services/auth-service";

export function * getClientAccountDataWorker(action) {
    const clientDataResponse = yield call(callGetClientData);

    const { BankAccountTypes, IsSuccess, Errors } = clientDataResponse;

    if (clientDataResponse && BankAccountTypes && IsSuccess) {
        yield put(setClientAccountData(clientDataResponse));
    } else if (Errors && Errors.length) {
        yield put(setPaymentStatus({active: false, paymentStatus: "FAILURE"}));
        for (let error in Errors) {
            console.error(error);
        }
    }
}

export function * getClientAccountDataWatcher() {
    yield takeEvery(GET_CLIENT_ACCOUNT_DATA, getClientAccountDataWorker)
}

export function * getPaymentHistoryWorker(action) {
    const { payload: { caseId } } = action;
    const paymentHistoryResponse = yield call(callPaymentHistory, caseId);

    const { CaseDeposits, IsSuccess, Errors } = paymentHistoryResponse;

    if (paymentHistoryResponse && CaseDeposits && IsSuccess) {
        yield put(setPaymentHistory(CaseDeposits));
    } else if (Errors && Errors.length) {
        for (let i = 0; i < Errors.length; i++) {
            console.error(JSON.stringify(Errors[i]));
        }
    }
}

export function * getPaymentHistoryWatcher() {
    yield takeEvery(GET_PAYMENT_HISTORY, getPaymentHistoryWorker)
}

export function * makePaymentWorker(action) {
    const {payload: { payment: request }} = action;
    request.clientNumber = yield getClientId();
    const makePaymentResponse = yield call(callMakePayment, request);

    const { ConfirmationNumber, Errors } = makePaymentResponse;

    yield put(setPaymentStatus({active: true, paymentStatus: "PENDING"}));

    if ( makePaymentResponse && ConfirmationNumber) {
        yield put(setConfirmation(makePaymentResponse));
        yield put(setPaymentStatus({active: false, paymentStatus: "SUCCESS"}));

    } else if (Errors) {
        yield put(setPaymentStatus({active: false, paymentStatus: "FAILURE"}));
        for (let i = 0; i < Errors.length; i++) {
            console.error(JSON.stringify(Errors[i]));
        }
    }
}

export function * makePaymentWatcher() {
    yield takeEvery(MAKE_PAYMENT, makePaymentWorker)
}

export function * paymentSaga() {
    yield all([
        makePaymentWatcher(),
        getClientAccountDataWatcher(),
        getPaymentHistoryWatcher()
    ])
}