import { LOGIN, LOGIN_SUCCESS, SET_EXTERNAL_ID, VERIFY } from "../auth/action";

export const STATUS = 'status'

export const IN_PROGRESS = 'IN_PROGRESS'
export const COMPLETED = 'COMPLETED'
export const WAITING = 'WAITING'
export const FAILED = 'FAILED'

interface statusShape { key: string, start: string; stop: string}
interface allStatusShapes { [LOGIN]: statusShape, [VERIFY]: statusShape }

// to add actions to watch,
export const LOGIN_STATUS_RELATED_ACTIONS : statusShape  = { key: LOGIN, start: LOGIN, stop: LOGIN_SUCCESS}
export const VERIFY_STATUS_RELATED_ACTIONS : statusShape  = { key: VERIFY, start: VERIFY, stop: SET_EXTERNAL_ID }

const INITIAL_STATUS : statusShape = {key: 'undefined', start: 'undefined', stop: 'undefined'}
const INITIAL_STATUSES : allStatusShapes = { [LOGIN] : INITIAL_STATUS, [VERIFY]: INITIAL_STATUS }

export const STATUS_RELATED_ACTIONS_TO_WATCH : allStatusShapes = [
    LOGIN_STATUS_RELATED_ACTIONS,
    VERIFY_STATUS_RELATED_ACTIONS
].reduce( (acc, {key,start,stop} : statusShape) => { return ({
        ...acc,
        [start]: { key,start,stop },
        [stop]: { key,start,stop }
    })}, INITIAL_STATUSES
)

const initialStatusState = {
    status: WAITING,
    countByStatus: {
        [ IN_PROGRESS ]: 0,
        [ COMPLETED ]: 0,
        [ FAILED ]: 0,
    }
}

const initialState = {
    [STATUS]: {
        [LOGIN]: {...initialStatusState},
        [VERIFY]: {...initialStatusState}
    }
}

export const commonReducer = (state= initialState, action) => {
    if (!action) return {...state};

    const status = STATUS_RELATED_ACTIONS_TO_WATCH[action.type]
    if(status) {
        const {start, key} = status

        const curr = state.status[key]
        const disposition = action.type === start ? IN_PROGRESS : COMPLETED;
        return {
            ...state,
           [STATUS]: {
                ...state[STATUS],
               [key]: {
               status: disposition,
               countByStatus: {
                   ...curr.countByStatus,
                   [disposition]: curr.countByStatus[disposition] + 1
               }
           }
           }
        }
    }

    return state
};

export const apiStatusByIdSelector = (state) => !state.common.status
export const allApiSelector = (state) => !state.common.status ? [] : Object.keys(state.common.status)
