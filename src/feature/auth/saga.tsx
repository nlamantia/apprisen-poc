import {all, call, put, takeEvery} from 'redux-saga/effects'
import {GET_CREDENTIALS, LOGIN, LOGOUT, setCredentials, setLoginStatus, VERIFY} from "./action";
import {Plugins} from "@capacitor/core";
import {callLinkAccount, callLoginEndpoint, verify} from "../../services/rest.service";
import {assertLoggedIn, getCaseId, getCredentials, login, logout} from "../../services/auth.service";
import {LoginResponse} from "../../models/auth/login-response";

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

export function * getCredentialsWorker(action) {
    const credsString = (yield Storage.get({key: 'credentials'})).value;

    if (!credsString || credsString === "") {
        throw new Error("No credentials found");
    } else {
        console.log("credentials found!")
        let credentials = JSON.parse(credsString);
        yield assertLoggedIn(credentials);
        yield put(setCredentials(credentials as LoginResponse));
    }
}

export function * getCredentialsWatcher() {
    yield takeEvery(GET_CREDENTIALS, getCredentialsWorker);
}


export function * verifyWorker(action) {
    const { payload } = action
    try {
        yield call(verify, payload)
        const externalApplicationId = yield call(getCaseId)
        const {signedToken, username, expiresOn} = yield call(getCredentials)
        const responseToLink = yield call(callLinkAccount, {
            Application: "TestMyChange",
            ExternalApplicationId: externalApplicationId,
            SignedToken: signedToken,
            UserName: username,
            ExpiresOn: expiresOn
        })
    } catch(e) {

    }
}

export function * verifyWatcher() {
    yield takeEvery(VERIFY, verifyWorker);
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
        logoutWatcher(),
        getCredentialsWatcher(),
        verifyWatcher()
    ])
}
