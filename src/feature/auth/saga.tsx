import {all, call, put, takeEvery} from 'redux-saga/effects'
const { Storage } = Plugins;
import {restService} from "../../services/rest.service";
import {LOGIN, LOGOUT, setCredentials, setLoginStatus} from "./action";
import {Plugins} from "@capacitor/core";


export function * loginWorker(action) {
    const { payload: { credential } } = action
    const loginResponse = yield call(restService.callLoginEndpoint, credential);

    const { signedToken, username, expiresOn } = loginResponse

    yield put(setLoginStatus({loginState: "ACTIVE", message: "PENDING"}))

    // todo validate
    if ( loginResponse && signedToken && username && expiresOn) {
        // todo use logger
        console.log('storing credential:' + JSON.stringify(loginResponse))
        // todo store in redux vs storage, or both?
        yield call(Storage.set, ({
            key: 'credentials',
            value: JSON.stringify(loginResponse)
        }))

        yield put(setCredentials(loginResponse))
        yield put(setLoginStatus({loginState: "INACTIVE", message: "SUCCESS"}))
    } else {
        yield put(setLoginStatus({loginState: "INACTIVE", message: "FAILURE"}))
    }
}

export function * loginWatcher() {
    yield takeEvery(LOGIN, loginWorker)
}

export function * logoutWorker() {
    console.log('called logout')
    Storage.remove({ key: 'credentials' }).then(() => console.log('removed credential'));
    yield put(setCredentials(null))
}

export function * logoutWatcher() {
    yield takeEvery(LOGOUT, logoutWorker)
}

export function * authSaga() {
    yield all([
        loginWatcher(),
        logoutWatcher()
    ])
}
