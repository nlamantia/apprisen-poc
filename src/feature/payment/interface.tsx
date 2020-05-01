import {LoginResponse} from "../../models/auth/login-response";
import {PaymentResponse} from "../../models/payment/payment-response";
import {ClientAccountData} from "../../models/client/client-account-data";
import {PaymentStatus} from "../../models/payment/payment-status";
import {
    GET_CLIENT_ACCOUNT_DATA, GET_PAYMENT_HISTORY,
    MAKE_PAYMENT,
    SET_CLIENT_ACCOUNT_DATA,
    SET_CONFIRMATION, SET_PAYMENT_HISTORY,
    SET_PAYMENT_STATUS
} from "./action";
import {PaymentRequest} from "../../models/payment/payment-request";
import {CaseDeposit} from "../../models/payment/case-deposit";

// This is an interface (typescript feature)
// This is a way of adding something like 'static typing' to javascript
interface SetConfirmationAction {
    type: typeof SET_CONFIRMATION,
    payload: { response: PaymentResponse }
}

interface GetClientAccountDataAction {
    type: typeof GET_CLIENT_ACCOUNT_DATA,
    payload: { credentials: LoginResponse }
}

interface SetClientAccountDataAction {
    type: typeof SET_CLIENT_ACCOUNT_DATA,
    payload: { response: ClientAccountData }
}

interface MakePaymentAction {
    type: typeof MAKE_PAYMENT,
    payload: { payment: PaymentRequest }
}

interface SetPaymentStatusAction {
    type: typeof SET_PAYMENT_STATUS,
    payload: { status: PaymentStatus }
}

interface GetPaymentHistoryAction {
    type: typeof GET_PAYMENT_HISTORY
}

interface SetPaymentHistoryAction {
    type: typeof SET_PAYMENT_HISTORY,
    payload: { payments: CaseDeposit[] }
}

// This is a type which is used to say that 'any action created by this function must match one of the following interfaces'
// In this case, every action creator for the
export type PaymentActionTypes =
    SetConfirmationAction |
    GetClientAccountDataAction |
    SetClientAccountDataAction |
    MakePaymentAction |
    SetPaymentStatusAction |
    GetPaymentHistoryAction |
    SetPaymentHistoryAction;

