import {SEND_EMAIL, SET_MESSAGE, SET_SENT_STATUS} from "./action";
import {EmailRequest} from "../../models/contact/email-request";

export enum ContactStatus {
    IDLE = "IDLE",
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
};

interface SendEmailAction {
    type: typeof SEND_EMAIL,
    payload: { emailRequest: EmailRequest }
}

interface SetMessageAction {
    type: typeof SET_MESSAGE,
    payload: { message: string }
}

interface SetSentStatusAction {
    type: typeof SET_SENT_STATUS,
    payload: { status: ContactStatus,  }
}

export type ContactActionType = SendEmailAction | SetMessageAction | SetSentStatusAction;