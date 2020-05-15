import {commonReducer, IN_PROGRESS, STATUS, WAITING} from "./reducer";
import {LOGIN, SET_CREDENTIALS} from "../auth/action";

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
        expect(commonReducer(initialState, {type: LOGIN}).status.login).toEqual( {"status": "in progress", "countByStatus": {"COMPLETED": 0, "FAILED": 0, "IN_PROGRESS": 1}});
        expect(commonReducer(initialState, {type: SET_CREDENTIALS}).status.login).toEqual( {"status": "completed", "countByStatus": {"COMPLETED": 1, "FAILED": 0, "IN_PROGRESS": 1}});
        expect(commonReducer(initialState, {type: LOGIN}).status.login).toEqual( {"status": "completed", "countByStatus": {"COMPLETED": 1, "FAILED": 0, "IN_PROGRESS": 2}});
    });
});
