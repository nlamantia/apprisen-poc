import {SET_CREDENTIALS, SET_LOGIN_STATUS} from "./action";
import {LoginRequest} from "../../models/auth/login-request";
import {LoginStatus} from "../../models/auth/loginStatus";

export interface AuthState {
    credentials: LoginRequest
    loginStatus: LoginStatus
}

const initialState: AuthState = {
    credentials: {} as LoginRequest,
    loginStatus: {} as LoginStatus
}

export const authReducer = (state = initialState, action) => {
    if (!action) return state

    switch(action.type) {
        case SET_CREDENTIALS:
            const { payload: { credentials } } = action

            return {
                ...state,
                credentials
            }
            break;

        case SET_LOGIN_STATUS:
            const { payload: { loginStatus } } = action

            return {
                ...state,
                loginStatus
            }
            break;
        default:
            return state;
            break;
    }
}