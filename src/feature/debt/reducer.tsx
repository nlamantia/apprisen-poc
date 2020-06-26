import {GET_DEBTS, SELECT_DEBT, SET_DEBTS} from "./action";
import {CaseDebt} from "../../models/case/case-debt";
import {Storage} from "@capacitor/core";

export interface DebtState {
    debts: CaseDebt[]
    selectedDebtId: number
    fetchingDebtDetail: boolean
}

const initialState : DebtState = {
    debts: null,
    selectedDebtId: null as number,
    fetchingDebtDetail: false
}

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
            const {payload: { debts }} = action

            return {
                ...state,
                fetchingDebtDetail: false,
                debts: debts
            }
            break;
        }
        case SELECT_DEBT: {
            const { payload: { id }  } = action

            Storage.set({key: 'selectedDebtId', value: id});

            return {
                ...state,
                selectedDebtId: id
            }
        }
        default:
            return state;
            break;
    }
}