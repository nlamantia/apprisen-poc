import {PaymentResponse} from "../../models/payment/payment-response";
import {PaymentStatus} from "../../models/payment/payment-status";

export const SET_CONFIRMATION = "setConfirmation";
export const setConfirmation = (response: PaymentResponse) => ({
    type: SET_CONFIRMATION,
    payload: { response }
});

export const MAKE_PAYMENT = "makePayment";
export const makePayment = (payment: PaymentRequest) => ({
    type: MAKE_PAYMENT,
    payload: { payment }
});

export const SET_PAYMENT_STATUS = "setPaymentStatus";
export const setPaymentStatus = (status: PaymentStatus) => ({
    type: SET_PAYMENT_STATUS,
    payload: { status }
});