import {PaymentStatus} from "../../models/payment/payment-status";
import {SET_CLIENT_ACCOUNT_DATA, SET_CONFIRMATION, SET_PAYMENT_HISTORY, SET_PAYMENT_STATUS} from "./action";
import {ClientAccountData} from "../../models/client/client-account-data";
import {CaseDeposit} from "../../models/payment/case-deposit";

export interface PaymentState {
    confirmationNumber: string,
    paymentStatus: PaymentStatus,
    clientAccountData: ClientAccountData,
    paymentHistory: CaseDeposit[]
}

const initialPaymentStatus: PaymentStatus = {
    paymentStatus: "PENDING",
    active: false
};

const initialState: PaymentState = {
    confirmationNumber: "",
    paymentStatus: initialPaymentStatus,
    clientAccountData: {} as ClientAccountData,
    paymentHistory: [] as CaseDeposit[]
}

export const paymentReducer = (state: PaymentState = initialState, action) => {
    if (!action) return {...state};
    switch(action.type) {
        case SET_CONFIRMATION:
            const { payload: { response: { confirmationNumber } } } = action;

            return {
                ...state,
                confirmationNumber
            };

        case SET_PAYMENT_STATUS:
            const {payload: { status: { paymentStatus, active } } } = action;
            console.log(JSON.stringify(paymentStatus));

            return {
                ...state,
                paymentStatus: {
                    paymentStatus,
                    active
                }
            };

        case SET_CLIENT_ACCOUNT_DATA:
            const {payload: { response: clientAccountData } } = action;

            return {
                ...state,
                clientAccountData
            };

        case SET_PAYMENT_HISTORY:
            const {payload: { payments } } = action;
            console.log("Setting payment history: " + JSON.stringify(payments));

            return {
                ...state,
                paymentHistory: payments
            };

        default:
            return state;
    }
};