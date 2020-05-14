import {all, call, put, takeEvery} from 'redux-saga/effects'
import {GET_CREDENTIALS, LOGIN, LOGOUT, setCredentials, setExternalId, VERIFY} from "./action";
import {Plugins} from "@capacitor/core";
import {callLinkAccount, callLoginEndpoint, callVerifyClientNumber} from "../../services/rest.service";
import {assertLoggedIn, getCredentials, login, logout} from "../../services/auth.service";
import {LoginResponse} from "../../models/auth/login-response";

const { Storage } = Plugins;

export function * loginWorker(action) {
    const { payload: { credentials } } = action
    const loginResponse = yield call(callLoginEndpoint, credentials);

    const { signedToken, username, expiresOn } = loginResponse

    // todo validate
    if ( loginResponse && signedToken && username && expiresOn) {
        yield call(setCredentials,loginResponse)
        yield call(login, loginResponse)
        yield assertLoggedIn(loginResponse)

        yield put(setCredentials(loginResponse))
    } else {
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
    const { payload: {zipCode, lastFourOfSSID, clientId} } = action
    try {
        const {signedToken, username, expiresOn} = yield call(getCredentials)
        const responseToVerify = yield call(callVerifyClientNumber, {zipCode, lastFourOfSSID, clientId})

        const responseToLink = yield call(callLinkAccount, {
            Application: "TestMyChange",
            ExternalApplicationId: clientId,
            SignedToken: signedToken,
            UserName: username,
            ExpiresOn: expiresOn
        })

        yield put(setExternalId(clientId))
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
