import {all, call, put, select, takeEvery} from "@redux-saga/core/effects";
import {restService} from "../../services/rest.service";
import {GET_CLIENT_ACCOUNT_DATA, MAKE_PAYMENT, setClientAccountData, setConfirmation, setPaymentStatus} from "./action";
import {PaymentRequest} from "../../models/payment/payment-request";

export function * getClientAccountDataWorker(action) {
    const state = yield select();

    const { auth: { credentials } } = state;

    const clientDataResponse = yield call(restService.callGetClientData, credentials);

    const { bankAccountTypes, IsSuccess, errors } = clientDataResponse;

    if (clientDataResponse && bankAccountTypes && IsSuccess) {
        yield put(setClientAccountData(clientDataResponse));
    } else if (errors && errors.length) {
        yield put(setPaymentStatus({paymentStatus: "FAILURE"}));
        for (let error in errors) {
            console.error(error);
        }
    }
}

export function * getClientAccountDataWatcher() {
    yield takeEvery(GET_CLIENT_ACCOUNT_DATA, getClientAccountDataWorker)
}

export function * makePaymentWorker(action) {
    const state = yield select();

    console.log("Inside payment worker");
    const { auth: { credentials } } = state;

    const {payload: { payment: request }} = action;

    console.log("before call" + JSON.stringify(request));
    const makePaymentResponse = yield call(restService.callMakePayment, credentials, request);
    console.log(JSON.stringify(makePaymentResponse));

    const { confirmationNumber, errors } = makePaymentResponse;

    yield put(setPaymentStatus({paymentStatus: "PENDING"}));

    if ( makePaymentResponse && confirmationNumber) {
        console.log("success");
        yield put(setConfirmation(makePaymentResponse));
        yield put(setPaymentStatus({paymentStatus: "SUCCESS"}));

    } else if (errors) {
        yield put(setPaymentStatus({paymentStatus: "FAILURE"}));
        for (let error in errors) {
            console.error(error);
        }
    }
}

export function * makePaymentWatcher() {
    yield takeEvery(MAKE_PAYMENT, makePaymentWorker)
}

export function * paymentSaga() {
    yield all([
        makePaymentWatcher(),
        getClientAccountDataWatcher()
    ])
}