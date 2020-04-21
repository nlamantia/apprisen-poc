import { put, takeEvery, all, call } from 'redux-saga/effects'
import { GET_CLIENT_INFORMATION, setClientInformation } from "./action";
import {callClientInformationEndpoint} from "../../services/rest.service";


export function * getClientInformationWorker(action) {
    const { payload: { credentials } } = action

    const caseId = credentials ? credentials.linkedApplication[0].externalId : "";

    if (caseId !== "") {
        const clientInformation = yield call(callClientInformationEndpoint)

        if (true) { // todo validate
            yield put(setClientInformation(clientInformation))
        } else {

        }
    } else {
        // todo handle case
    }

}

export function * getClientInformationWatcher() {
    yield takeEvery(GET_CLIENT_INFORMATION, getClientInformationWorker)
}

export function * clientSaga() {
    yield all([
       getClientInformationWatcher()
    ])
}



