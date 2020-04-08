import { createAction } from 'typesafe-actions'
import { ClientInformation } from "models/case/client-information";
import {GET_CLIENT_INFORMATION, SET_CLIENT_INFORMATION } from "./action";
import {LoginRequest} from "../../models/auth/login-request";
import {LoginResponse} from "../../models/auth/login-response";

interface GetClientInformationMessageAction {
    type: typeof GET_CLIENT_INFORMATION,
    payload: { credentials: LoginResponse }
}

interface SetClientInformationMessageAction {
    type: typeof SET_CLIENT_INFORMATION,
    payload: { clientInformation: ClientInformation }
}

export type ClientInformationTypes =
    GetClientInformationMessageAction |
    SetClientInformationMessageAction
