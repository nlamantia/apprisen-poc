import { createAction } from 'typesafe-actions'
import { CaseSummary } from "models/case/case-summary";
import {GET_CASE_SUMMARY, SET_CASE_SUMMARY} from "./action";
import {LoginRequest} from "../../models/auth/login-request";
import {LoginResponse} from "../../models/auth/login-response";

// This is an interface (typescript feature)
// This is a way of adding something like 'static typing' to javascript
interface SetCaseMessageAction {
    // this says the the action's type must be a string (typeof GET_CASE_SUMMARY is a string)
    type: typeof SET_CASE_SUMMARY,
    // this says that the payload must be of type 'CaseSummary'
    payload: { caseSummary: CaseSummary }
}

interface GetCaseMessageAction {
    type: typeof GET_CASE_SUMMARY,
    payload: { credentials: LoginResponse }
}

// This is a type which is used to say that 'any action created by this function must match one of the following interfaces'
// In this case, every action creator for the
export type CaseTypes =
    GetCaseMessageAction |
    SetCaseMessageAction


