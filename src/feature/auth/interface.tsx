import {LOGIN, SET_CREDENTIALS, SET_LOGIN_STATUS, VERIFY} from "./action";
import {LoginStatus} from "../../models/auth/loginStatus";
import {LoginRequest} from "../../models/auth/login-request";
import {LoginResponse} from "../../models/auth/login-response";

interface SetCredentialMessageAction {
    type: typeof SET_CREDENTIALS,
    payload: { credentials: LoginResponse }
}

interface LoginMessageAction {
    type: typeof LOGIN,
    payload: { credentials: LoginRequest }
}

interface SetLoginStatusMessageAction {
    type: typeof SET_LOGIN_STATUS,
    payload: { loginStatus: LoginStatus }
}

interface VerifyUserMessageAction {
    type: typeof VERIFY,
    payload: { lastFourOfSSID: number, zipCode: number, clientId: string }
}


export type AuthTypes =
    LoginMessageAction |
    SetCredentialMessageAction |
    SetLoginStatusMessageAction |
    VerifyUserMessageAction
