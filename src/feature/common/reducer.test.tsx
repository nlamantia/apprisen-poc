import {commonReducer, STATUS, WAITING} from "./reducer";
import {LOGIN, LOGIN_SUCCESS, SET_CREDENTIALS} from "../auth/action";

describe('common reducer', () => {

    const initialStatusState = {
        status: WAITING,
        countByStatus: {
            IN_PROGRESS: 0,
            COMPLETED: 0,
            FAILED: 0,
        }
    }

    const initialState = {
        [STATUS]: {
            [LOGIN]: {...initialStatusState}
        }
    }

    describe('it responds to actions', () => {
        const first = commonReducer(initialState, {type: LOGIN})
        expect(first.status.login).toEqual( {"status": "IN_PROGRESS", "countByStatus": {"COMPLETED": 0, "FAILED": 0, "IN_PROGRESS": 1}});
        const second = commonReducer(first, {type: LOGIN_SUCCESS})
        expect(second.status.login).toEqual( {"status": "COMPLETED", "countByStatus": {"COMPLETED": 1, "FAILED": 0, "IN_PROGRESS": 1}});
        const third = commonReducer(second, {type: LOGIN})
        expect(third.status.login).toEqual( {"status": "IN_PROGRESS", "countByStatus": {"COMPLETED": 1, "FAILED": 0, "IN_PROGRESS": 2}});
    });
});
