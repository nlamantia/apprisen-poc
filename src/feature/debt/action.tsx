import {DebtTypes} from "./interface";
import {DebtDetail} from "../../models/case/debt-detail";
import {LoginResponse} from "../../models/auth/login-response";


export const GET_DEBTS = "getDebts"
export function getDebts(credentials: LoginResponse): DebtTypes {
    return {
        type: GET_DEBTS,
        payload: { credentials }
    }
}

export const SET_DEBTS = "setDebts"
export function setDebts(debts : DebtDetail[] ): DebtTypes {
    return {
        type: SET_DEBTS,
        payload: { debts }
    }
}

export const SELECT_DEBT = "selectDebt"
export function selectDebt(id: string): DebtTypes {
    return {
        type: SELECT_DEBT,
        payload: { id }
    }

}
