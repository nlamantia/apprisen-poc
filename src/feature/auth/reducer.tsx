import {LOGIN_SUCCESS, SET_CREDENTIALS, SET_EXTERNAL_ID } from "./action";
import {LoginRequest} from "../../models/auth/login-request";

export interface AuthState {
    credentials: LoginRequest
    externalId: number
}

const initialState: AuthState = {
    credentials: {} as LoginRequest,
    externalId: null as number
}

export const authReducer = (state = initialState, action) => {
    if (!action) return state
    switch(action.type) {
        case SET_EXTERNAL_ID:
            const { payload: { externalId }} = action

            return {
                ...state,
                externalId
            }
        case LOGIN_SUCCESS:
        case SET_CREDENTIALS:
            const { payload: { credentials } } = action

            return {
                ...state,
                credentials
            }
            break;

        default:
            return state;
            break;
    }
}