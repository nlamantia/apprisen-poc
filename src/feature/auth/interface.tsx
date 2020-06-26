import {LOGIN, SET_CREDENTIALS, VERIFY} from "./action";
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

interface VerifyUserMessageAction {
    type: typeof VERIFY,
    payload: { lastFourOfSSID: number, zipCode: number, clientId: string }
}


export type AuthTypes =
    LoginMessageAction |
    SetCredentialMessageAction |
    VerifyUserMessageAction
