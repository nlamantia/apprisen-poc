import {PaymentResponse} from "../../models/payment/payment-response";
import {PaymentStatus} from "../../models/payment/payment-status";
import {ClientAccountData} from "../../models/client/client-account-data";
import {LoginResponse} from "../../models/auth/login-response";
import {PaymentActionTypes} from "./interface";
import {PaymentRequest} from "../../models/payment/payment-request";

export const SET_CONFIRMATION = "setConfirmation";
export const setConfirmation = (response: PaymentResponse): PaymentActionTypes => ({
    type: SET_CONFIRMATION,
    payload: { response }
});

export const GET_CLIENT_ACCOUNT_DATA = "getClientAccountData";
export const getClientAccountData = (credentials: LoginResponse): PaymentActionTypes => ({
    type: GET_CLIENT_ACCOUNT_DATA,
    payload: { credentials }
});

export const SET_CLIENT_ACCOUNT_DATA = "setClientAccountData";
export const setClientAccountData = (response: ClientAccountData): PaymentActionTypes => ({
    type: SET_CLIENT_ACCOUNT_DATA,
    payload: { response }
});

export const MAKE_PAYMENT = "makePayment";
export const makePayment = (payment: PaymentRequest): PaymentActionTypes => ({
    type: MAKE_PAYMENT,
    payload: { payment }
});

export const SET_PAYMENT_STATUS = "setPaymentStatus";
export const setPaymentStatus = (status: PaymentStatus): PaymentActionTypes => ({
    type: SET_PAYMENT_STATUS,
    payload: { status }
});