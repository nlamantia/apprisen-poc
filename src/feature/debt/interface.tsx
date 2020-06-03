import {GET_DEBTS, GET_SELECTED_DEBT, SELECT_DEBT, SET_DEBTS} from "./action";
import {CaseDebt} from "../../models/case/case-debt";

interface GetDebtsMessageAction {
    type: typeof GET_DEBTS,
    payload: { caseId: string }
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
