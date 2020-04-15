import {PaymentStatus} from "../../models/payment/payment-status";
import {SET_CONFIRMATION, SET_PAYMENT_STATUS} from "./action";

export interface PaymentState {
    confirmationNumber: string,
    paymentStatus: PaymentStatus
}

const initialState: PaymentState = {
    confirmationNumber: "",
    paymentStatus: {} as PaymentStatus
}

export const paymentReducer = (state = initialState, action) => {
    if (!action) return state;
    switch(action.type) {
        case SET_CONFIRMATION:
            const { payload: { confirmationNumber } } = action;

            return {
                ...state,
                confirmationNumber
            };

        case SET_PAYMENT_STATUS:
            const {payload: { paymentStatus } } = action;

            return {
                ...state,
                paymentStatus
            };

        default:
            return state;
    }
};