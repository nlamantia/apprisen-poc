import { createAction } from 'typesafe-actions'
import { CaseSummary } from "models/case/case-summary";
import { CaseTypes } from "./interface";
import {LoginRequest} from "../../models/auth/login-request";
import {LoginResponse} from "../../models/auth/login-response";

// Action type
// This is the signal that reducers and sagas use to different different types of actions
// It's really just a string, but it being wrapped in a constant variable ensures that typos don't occur which cause issues
export const GET_CASE_SUMMARY = "getCaseSummary"
// This is an action creator
// An action creator is a function which returns an action
// Usually, you will use an action creator in a way like this: dispatch(getCaseSummary(caseSummary))
// This is executed in the following way
// 1. getCaseSummary(caseSummary) is run, creating an object with a type GET_CASE_SUMMARY and payload value of caseSummary
// 2. This action is passed as a parameter to 'dispatch()'
// This is a redux function, which takes the action and passes it to the root reducer ('redux/root.tsx')
// 3. The root reducer then passes the action to all reducers bound to it.
// 4. Each reducer is composed of a series of conditionals, each of which looks for a specific type of action
// if there is a reducer which has a case for this type of action, the payload of this action is then used to perform whatever
// actions are necessary
//
// Also, since we're using Saga, if there is a saga watcher for this type of action, then it is called
// ( usually, either a saga or a reducer will handle an action, not both.)
export function getCaseSummary(credentials: LoginResponse): CaseTypes {
    console.log({credentials, e: 'action'})
    return {
        type: GET_CASE_SUMMARY,
        payload: { credentials }
    }
}

export const SET_CASE_SUMMARY = "setCaseSummary"
export function setCaseSummary(caseSummary: CaseSummary): CaseTypes {
    return {
        type: SET_CASE_SUMMARY,
        payload: { caseSummary }
    }
}


export const SET_CASE_PAYOFF_DATE = "setCasePayoffDate"
export function setCasePayoffDate({ casePayoffDate }) : CaseTypes {
    return {
        type: SET_CASE_PAYOFF_DATE,
        payload: { casePayoffDate }
    }
}


export const GET_CASE_PAYOFF_DATE = "getCasePayoffDate"
export function getCasePayoffDate({ caseNumber, increaseAmount, isOneTimePayment }) : CaseTypes {
    return {
        type: GET_CASE_PAYOFF_DATE,
        payload: { caseNumber, increaseAmount, isOneTimePayment }
    }
}
