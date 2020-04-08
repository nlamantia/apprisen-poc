import { SET_CLIENT_INFORMATION } from "./action";
import { ClientInformation } from "models/case/client-information";

export interface CaseState {
    clientInformation: ClientInformation
}

const initialState = {
    clientInformation: {} as ClientInformation,
}

export const clientReducer = (state = initialState, action) => {
    if (!action) return state
    switch(action.type) {
        case SET_CLIENT_INFORMATION:
            const { payload: { clientInformation } } = action

            // todo validate
            if (true) {
                return {
                    ...state,
                    clientInformation
                }
            } else {
                // todo
            }
            break;
        default:
            return state;
            break;
    }
}