import {SET_CASE_SUMMARY} from "./action";
import { CaseSummary } from "models/case/case-summary";

// This is an interface which creates a contract saying 'the state of the reducer must always look like this'
export interface CaseState {
    caseSummary: CaseSummary
}

// This is an object which defines the initial state of our store
// Meaning,
// A. on application start up, this is our initial state
// B. when you call caseReducer() without passing any parameters, this exact object is returned
const initialState : CaseState = {
    caseSummary: {} as CaseSummary,
}

// This is a reducer, the core concept behind redux
// A reducer takes in a state and an action and returns a new state. This state is then stored in the 'store', which components
// can subscribe to (meaning they can access pieces of it)
// The combination of the state which is passed in and the action determines what the outgoing state will look like
//
// There are two important concepts behind this:
// A. This is a true function
// Meaning that, no matter what, given the same input, this reducer will 100% of the time return the same exact value
// B. States are immutable
// A reducer doesn't modify state. It creates new states.

// Because many many different components can interact with a reducer at once, these two characteristics of a reducer
// mitigate many common difficult to fix bugs, such as race conditions
// https://searchstorage.techtarget.com/definition/race-condition
// https://old.reddit.com/r/functionalprogramming/comments/7z6lz2/why_does_functional_mean_no_race_conditions/
export const caseReducer = (state: CaseState = initialState, action) => {
    if (!action) return state
    switch(action.type) {
        case SET_CASE_SUMMARY:
            // if an action is dispatched with type 'SET_CASE_SUMMARY' this code is run

            // we grab the variable 'caseSummary' from the action's payload here
            // this uses destructuring syntax:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
            const { payload: { caseSummary } } = action

            // This creates a new state which is identical to the previous state, excepting the caseSummary
            //
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            return {
                ...state,
                caseSummary
            }
            break;
        default:
            return {...state};
            break;
    }
}