import {ClientInformationTypes} from "./interface";
import {ClientInformation} from "../../models/case/client-information";
import {LoginResponse} from "../../models/auth/login-response";

export const GET_CLIENT_INFORMATION = "getClientInformation"

export function getClientInformation(credentials: LoginResponse): ClientInformationTypes {
    return {
        type: GET_CLIENT_INFORMATION,
        payload: { credentials }
    }
}

export const SET_CLIENT_INFORMATION = "setClientInformation"
export function setClientInformation(clientInformation : ClientInformation ): ClientInformationTypes {
    return {
        type: SET_CLIENT_INFORMATION,
        payload: { clientInformation }
    }
}
