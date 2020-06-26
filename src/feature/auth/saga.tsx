import {all, call, put, takeEvery} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {GET_CREDENTIALS, LOGIN, loginSuccess, LOGOUT, setCredentials, VERIFY} from "./action";
import {Plugins} from "@capacitor/core";
import {callLinkAccount, callLoginEndpoint, callVerifyClientNumber} from "../../services/rest.service";
import {assertLoggedIn, getCredentials, login, logout} from "../../services/auth.service";
import {LoginResponse} from "../../models/auth/login-response";
import {LINKED_APP_NAME} from "../../config/app-constants";
import {message} from "react-toastify-redux";

const { Storage } = Plugins;

export function * logoutWatcher() {
    yield takeEvery(LOGOUT, logoutWorker)
}

export function * logoutWorker() {
    yield call(logout)
    yield put(setCredentials(null))
    Storage.set({key: 'verified', value: null}).then(r => {});
}

export function * loginWatcher() {
    yield takeEvery(LOGIN, loginWorker)
}


export function * loginWorker(action) {
    const { payload: { credentials } } = action;
    const loginResponse = yield call(callLoginEndpoint, credentials);

    const { signedToken, username, expiresOn } = loginResponse;

    const credsAreGood = () => {
        // put more validation here if desired. This shouldn't be a concern though, even with a MITM attack
        return signedToken && username && expiresOn;
    };

    if (credsAreGood()) {
        yield call(setCredentials,loginResponse) // put credentials in store
        yield call(login, loginResponse) // puts credentials in LocalStorage
        yield call(assertLoggedIn, loginResponse) // if there's an issue, throw exceptions
        yield put(message('Logged In!'))

        yield put(loginSuccess(loginResponse))
    }
}

export function * getCredentialsWatcher() {
    yield takeEvery(GET_CREDENTIALS, getCredentialsWorker);
}

export function * getCredentialsWorker() {
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

export function * verifyWatcher() {
    yield takeEvery(VERIFY, verifyWorker);
}

export function * verifyWorker(action) {
    const { payload: {zipCode, lastFourOfSSID, clientId} } = action
    const ERROR_MESSAGE = `Hmm, something's not right about the information you entered`

    try {
        const {signedToken, username, expiresOn} = yield call(getCredentials)
        const responseToVerify = yield call(callVerifyClientNumber, {ZipCode: zipCode, Last4SSN: lastFourOfSSID, ClientNumber: clientId})

        if (responseToVerify) {
            yield put(message('Verified!'))
            const responseToLink = yield call(callLinkAccount, {
                Application: LINKED_APP_NAME,
                ExternalApplicationId: clientId,
                SignedToken: signedToken,
                UserName: username,
                ExpiresOn: expiresOn
            })

            if (responseToLink.isSuccess) {
                yield Storage.set({key: 'verified', value: 'true'})
                yield put(push('/logout'))
            }
        } else {
            throw new Error()
        }

    } catch(e) {
        yield put(message(ERROR_MESSAGE))
    }
}

export function * authSaga() {
    yield all([
        loginWatcher(),
        logoutWatcher(),
        getCredentialsWatcher(),
        verifyWatcher()
    ])
}
