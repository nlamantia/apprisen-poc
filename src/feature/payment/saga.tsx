import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import {GET_CLIENT_ACCOUNT_DATA, MAKE_PAYMENT, setClientAccountData, setConfirmation, setPaymentStatus} from "./action";
import {PaymentResponse} from "../../models/payment/payment-response";
import {callGetClientData, callMakePayment} from "../../services/rest.service";

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

export function * makePaymentWorker(action) {
    console.log("Inside payment worker");
    const {payload: { payment: request }} = action;

    const makePaymentResponse = yield call(callMakePayment, request);
    // const makePaymentResponse = yield getFakeResponse();

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

function getFakeResponse(): PaymentResponse {
    return {
        confirmationNumber: "ABCDEFG12345",
        IsSuccess: true,
        errors: []
    };
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