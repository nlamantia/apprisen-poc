import {GET_DEBTS, SELECT_DEBT, SET_DEBTS} from "./action";
import { DebtDetail } from "models/case/debt-detail";
import {CaseDebt} from "../../models/case/case-debt";

export interface DebtState {
    debtDetail: DebtDetail
    selectedDebtId: number
    fetchingDebtDetail: boolean
}

const initialState : DebtState = {
    debtDetail: {} as DebtDetail,
    selectedDebtId: null as number,
    fetchingDebtDetail: false
}

// todo handle cases
export const debtReducer = (state = initialState, action) => {
    if (!action) return state
    switch(action.type) {
        case GET_DEBTS: {
            return {
                ...state,
                fetchingDebtDetail: true
            }
        }
        case SET_DEBTS: {
            const {payload: debts} = action

            return {
                ...state,
                fetchingDebtDetail: false,
                debts
            }
            break;
        }
        case SELECT_DEBT: {
            const { payload: debtId } = action
            const { debtDetail: { caseDebts } } = state
            if ( caseDebts.some(debt => debt.$id === debtId)) {
                return {
                    ...state,
                    selectedDebtId: debtId
                }
            } else {
                // todo handle this?
            }
        }
        default:
            return state;
            break;
    }
}