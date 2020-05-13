import {all, put, call, takeEvery} from "@redux-saga/core/effects";
import {SEND_EMAIL, setMessage, setSentStatus} from "./action";
import {callSendEmail} from "../../services/rest.service";
import {ContactStatus} from "./interface";

export function * sendEmailWorker(action) {
    const {payload: emailRequest} = action;

    if (emailRequest) {
        const { recipients, subject, body } = emailRequest;
        if (!recipients || !subject || !body) {
            console.error("Invalid email request");
            yield(put(setSentStatus(ContactStatus.FAILURE)));
            yield(put(setMessage("Could not send email. Insufficient data provided.")))
        } else {
            const response = yield(call(callSendEmail, emailRequest));
            console.log("Send email response: " + response);

            if (response) {
                const { errors, IsSuccess } = response;
                if (!IsSuccess || !errors || errors.length > 0) {
                    const errorMessage = "Error sending email: " + JSON.stringify(errors);
                    console.error(errorMessage);

                    yield(put(setSentStatus(ContactStatus.FAILURE)));
                    yield(put(setMessage(errorMessage)));
                } else {
                    const successMessage = "Email sent successfully";
                    console.log(successMessage);
                    yield(put(setSentStatus(ContactStatus.SUCCESS)));
                    yield(put(setMessage(successMessage)));
                }
            }
        }
    } else {
        console.error("No credentials found");
    }
}

export function * sendEmailWatcher() {
    yield takeEvery(SEND_EMAIL, sendEmailWorker);
}

export function * contactSaga() {
    yield all([
        sendEmailWatcher()
    ])
}