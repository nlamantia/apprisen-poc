import {DebtDetail} from "models/case/debt-detail";
import { GET_DEBTS, SET_DEBTS, SELECT_DEBT } from "./action";
import {LoginResponse} from "../../models/auth/login-response";

interface GetDebtsMessageAction {
    type: typeof GET_DEBTS,
    payload: { credentials: LoginResponse }
}

interface SetDebtsMessageAction {
    type: typeof SET_DEBTS,
    payload: { debts: DebtDetail[] }
}

interface SelectDebtMessageAction {
    type: typeof SELECT_DEBT,
    payload: { id: string }
}

export type DebtTypes =
    GetDebtsMessageAction |
    SetDebtsMessageAction |
    SelectDebtMessageAction
