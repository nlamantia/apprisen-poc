import {all, call, put, takeEvery} from 'redux-saga/effects'
import {GET_CLIENT_INFORMATION, setClientInformation} from "./action";
import {callClientInformationEndpoint} from "../../services/rest.service";


export function * getClientInformationWorker(action) {
    const clientInformation = yield call(callClientInformationEndpoint)

    if (clientInformation && clientInformation.IsSuccess) { // todo validate
        yield put(setClientInformation(clientInformation))
    } else {
        console.error("Unable to get client information");
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



