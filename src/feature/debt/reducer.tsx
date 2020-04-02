import {GET_DEBTS, SELECT_DEBT, SET_DEBTS} from "./action";
import { DebtDetail } from "models/case/debt-detail";
import {CaseDebt} from "../../models/case/case-debt";

export interface DebtState {
    debts: CaseDebt[] // todo
    selectedDebtId: number
    fetchingDebtDetail: boolean
}

const initialState : DebtState = {
    // debtDetail: {} as DebtDetail,
    debts: null,
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
                debts: debts.debts // todo this isn't how this should be
            }
            break;
        }
        case SELECT_DEBT: {
            const { payload: debtId } = action
            const { debts } = state
            if ( debts.some(debt => debt.$id === debtId)) {
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