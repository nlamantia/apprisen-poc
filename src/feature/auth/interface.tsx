import {LOGIN, SET_CREDENTIALS, SET_LOGIN_STATUS} from "./action";
import {LoginStatus} from "../../models/auth/loginStatus";
import {LoginRequest} from "../../models/auth/login-request";
import {LoginResponse} from "../../models/auth/login-response";

interface SetCredentialMessageAction {
    type: typeof SET_CREDENTIALS,
    payload: { credentials: LoginResponse }
}

// todo distinct name difference between loginResponse and loginRequest
interface LoginMessageAction {
    type: typeof LOGIN,
    payload: { credentials: LoginRequest }
}

interface SetLoginStatusMessageAction {
    type: typeof SET_LOGIN_STATUS,
    payload: { loginStatus: LoginStatus }
}


export type AuthTypes =
    LoginMessageAction |
    SetCredentialMessageAction |
    SetLoginStatusMessageAction
