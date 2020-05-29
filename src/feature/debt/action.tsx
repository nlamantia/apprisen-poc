import {DebtTypes} from "./interface";
import {CaseDebt} from "../../models/case/case-debt";


export const GET_DEBTS = "getDebts";
export function getDebts(caseId: string): DebtTypes {
    return {
        type: GET_DEBTS,
        payload: { caseId }
    }
}

export const SET_DEBTS = "setDebts";
export function setDebts(debts : CaseDebt[] ): DebtTypes {
    return {
        type: SET_DEBTS,
        payload: { debts }
    }
}

export const SELECT_DEBT = "selectDebt";
export function selectDebt(id: string): DebtTypes {
    return {
        type: SELECT_DEBT,
        payload: { id }
    }
}

export const GET_SELECTED_DEBT = "getSelectedDebt";
export function getSelectedDebt(): DebtTypes {
    return {
        type: GET_SELECTED_DEBT
    }
}
