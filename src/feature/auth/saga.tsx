import {all, call, put, takeEvery} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {GET_CREDENTIALS, LOGIN, loginSuccess, LOGOUT, setCredentials, VERIFY} from "./action";
import {Plugins} from "@capacitor/core";
import {callLinkAccount, callLoginEndpoint, callVerifyClientNumber} from "../../services/rest-service";
import {assertLoggedIn, getCredentials, JSON_OBJECT_PARSER, login, logout} from "../../services/auth-service";
import {LoginResponse} from "../../models/auth/login-response";
import {message} from "react-toastify-redux";
import {LINKED_APP_NAME} from "../../common/app-constants";

const { Storage } = Plugins;

export function * logoutWatcher() {
    yield takeEvery(LOGOUT, logoutWorker)
}

export function * logoutWorker() {
    yield call(logout)
    yield put(setCredentials(null))
    yield Storage.set({key: 'verified', value: null}).then(r => {});
}

export function * loginWatcher() {
    yield takeEvery(LOGIN, loginWorker)
}


export function * loginWorker(action) {
    const { payload: { credentials } } = action;
    const loginResponse = yield call(callLoginEndpoint, credentials);

    const { SignedToken, Username, ExpiresOn } = loginResponse;

    const credsAreGood = () => {
        // put more validation here if desired. This shouldn't be a concern though, even with a MITM attack
        return SignedToken && Username && ExpiresOn;
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
        let credentials = JSON.parse(credsString, JSON_OBJECT_PARSER);
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
        const {SignedToken, Username, ExpiresOn} = yield call(getCredentials)
        const responseToVerify = yield call(callVerifyClientNumber, {ZipCode: zipCode, Last4SSN: lastFourOfSSID, ClientNumber: clientId})

        if (responseToVerify || responseToVerify.IsSuccess) {
            yield put(message('Verified!'))
            const responseToLink = yield call(callLinkAccount, {
                Application: LINKED_APP_NAME,
                ExternalApplicationId: clientId,
                SignedToken: SignedToken,
                UserName: Username,
                ExpiresOn: ExpiresOn
            })

            if (responseToLink.IsSuccess) {
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
