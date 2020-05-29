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
import {callGetClientData, callMakePayment, callPaymentHistory} from "../../services/rest.service";

export function * getClientAccountDataWorker(action) {
    const clientDataResponse = yield call(callGetClientData);

    const { bankAccountTypes, IsSuccess, errors } = clientDataResponse;

    if (clientDataResponse && bankAccountTypes && IsSuccess) {
        yield put(setClientAccountData(clientDataResponse));
    } else if (errors && errors.length) {
        yield put(setPaymentStatus({active: false, paymentStatus: "FAILURE"}));
        for (let error in errors) {
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

    const { caseDeposits, IsSuccess, errors } = paymentHistoryResponse;

    if (paymentHistoryResponse && caseDeposits && IsSuccess) {
        yield put(setPaymentHistory(caseDeposits));
    } else if (errors && errors.length) {
        for (let i = 0; i < errors.length; i++) {
            console.error(JSON.stringify(errors[i]));
        }
    }
}

export function * getPaymentHistoryWatcher() {
    yield takeEvery(GET_PAYMENT_HISTORY, getPaymentHistoryWorker)
}

export function * makePaymentWorker(action) {
    const {payload: { payment: request }} = action;

    const makePaymentResponse = yield call(callMakePayment, request);

    const { confirmationNumber, errors } = makePaymentResponse;

    yield put(setPaymentStatus({active: true, paymentStatus: "PENDING"}));

    if ( makePaymentResponse && confirmationNumber) {
        console.log("success");
        yield put(setConfirmation(makePaymentResponse));
        yield put(setPaymentStatus({active: false, paymentStatus: "SUCCESS"}));
        console.log("should have set response to success");

    } else if (errors) {
        yield put(setPaymentStatus({active: false, paymentStatus: "FAILURE"}));
        for (let i = 0; i < errors.length; i++) {
            console.error(JSON.stringify(errors[i]));
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