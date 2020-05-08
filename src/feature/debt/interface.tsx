import {DebtDetail} from "models/case/debt-detail";
import {GET_DEBTS, SET_DEBTS, SELECT_DEBT, GET_SELECTED_DEBT} from "./action";
import {LoginResponse} from "../../models/auth/login-response";
import {CaseDebt} from "../../models/case/case-debt";

interface GetDebtsMessageAction {
    type: typeof GET_DEBTS,
    payload: { credentials: LoginResponse }
}

interface SetDebtsMessageAction {
    type: typeof SET_DEBTS,
    payload: { debts: CaseDebt[] }
}

interface SelectDebtMessageAction {
    type: typeof SELECT_DEBT,
    payload: { id: string }
}

interface GetSelectedDebtAction {
    type: typeof GET_SELECTED_DEBT
}

export type DebtTypes =
    GetDebtsMessageAction |
    SetDebtsMessageAction |
    SelectDebtMessageAction |
    GetSelectedDebtAction
