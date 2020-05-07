import {AuthTypes} from "./interface";
import {LoginStatus} from "../../models/auth/loginStatus";
import {LoginRequest} from "../../models/auth/login-request";
import {LoginResponse} from "../../models/auth/login-response";

export const SET_LOGIN_STATUS = "setLoginStatus"
export function setLoginStatus(loginStatus : LoginStatus): AuthTypes {
    return {
        type: SET_LOGIN_STATUS,
        payload: { loginStatus }
    }
}

export const RESET_LOGIN_STATUS = "resetLogInStatus"
export const resetLoginStatus = () => ({
    type: RESET_LOGIN_STATUS,
})

export const GET_CREDENTIALS = "getCredentials"
export const getCredentials = () => ({
    type: GET_CREDENTIALS
})

export const SET_CREDENTIALS = "setCredentials"
export const setCredentials = (credentials: LoginResponse) => ({
   type: SET_CREDENTIALS,
   payload: { credentials }
})

export const LOGIN = "login"
export const login = (credentials: LoginRequest) =>  {
    return {
    type: LOGIN,
    payload: { credentials }
} }


export const LOGOUT = "logout"
export const logout = (credentials: LoginRequest) =>  ({
    type: LOGOUT,
    payload: { credentials }
})

export const VERIFY = "verify"
export const verify = ({zipCode, lastFourOfSSID, XXX}) => ({
    type: VERIFY,
    payload: {zipCode, lastFourOfSSID, XXX}
})
