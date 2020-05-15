import {SET_MESSAGE, SET_SENT_STATUS} from "./action";
import {ContactStatus} from "./interface";

export interface ContactState {
    message: string;
    status: ContactStatus;
}

const initialState: ContactState = {
    message: null,
    status: ContactStatus.IDLE
};

export const contactReducer = (state = initialState, action) => {
    if (!action) return {...state};
    switch (action.type) {
        case SET_MESSAGE:
            const { payload: { message } } = action;

            return {
                ...state,
                message
            };
        case SET_SENT_STATUS:
            const { payload: { status } } = action;

            return {
                ...state,
                status
            };
        default:
            return {...state};
    }
};