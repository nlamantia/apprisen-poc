import {EmailRequest} from "../../models/contact/email-request";
import {ContactActionType, ContactStatus} from "./interface";

export const SEND_EMAIL = "sendEmail";
export const sendEmail = (emailRequest: EmailRequest): ContactActionType => ({
    type: SEND_EMAIL,
    payload: { emailRequest }
});

export const SET_MESSAGE = "setMessage";
export const setMessage = (message: string): ContactActionType => ({
    type: SET_MESSAGE,
    payload: { message }
});

export const SET_SENT_STATUS = "setSentStatus";
export const setSentStatus = (status: ContactStatus): ContactActionType => ({
    type: SET_SENT_STATUS,
    payload: { status }
});