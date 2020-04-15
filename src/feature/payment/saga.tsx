import {all, call, put, select, takeEvery} from "@redux-saga/core/effects";
import {restService} from "../../services/rest.service";
import {MAKE_PAYMENT, setConfirmation, setPaymentStatus} from "./action";
import {PaymentRequest} from "../../models/payment/payment-request";

export function * makePaymentWorker(action) {
    const state = yield select();

    const { auth: { credentials } } = state;

    const request = {} as PaymentRequest;

    const makePaymentResponse = yield call(restService.callMakePayment, credentials, request);

    const { confirmationNumber, isSuccess, errors } = makePaymentResponse;

    yield put(setPaymentStatus({paymentStatus: "PENDING"}));

    if ( makePaymentResponse && confirmationNumber && isSuccess) {

        yield put(setConfirmation(makePaymentResponse));
        yield put(setPaymentStatus({paymentStatus: "SUCCESS"}));

    } else if (errors && errors.length) {
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
        makePaymentWatcher()
    ])
}