import {all, call, put, takeEvery} from 'redux-saga/effects'
import {LOGIN, LOGOUT, setCredentials, setLoginStatus} from "./action";
import {Plugins} from "@capacitor/core";
import {callLoginEndpoint} from "../../services/rest.service";
import {assertLoggedIn, login, logout} from "../../services/auth.service";

const { Storage } = Plugins;

export function * loginWorker(action) {
    const { payload: { credentials } } = action
    const loginResponse = yield call(callLoginEndpoint, credentials);

    const { signedToken, username, expiresOn } = loginResponse

    yield put(setLoginStatus({loginState: "ACTIVE", message: "PENDING"}))

    // todo validate
    if ( loginResponse && signedToken && username && expiresOn) {
        yield call(login,loginResponse)
        yield assertLoggedIn(loginResponse)

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
    yield call(logout)
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
