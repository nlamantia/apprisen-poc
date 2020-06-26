import React from 'react'
import {loginWatcher, loginWorker, verifyWorker} from "./saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {LOGIN, setCredentials} from "./action";
import {callLinkAccount, callLoginEndpoint, callVerifyClientNumber} from "../../services/rest-service";
import {Plugins} from "@capacitor/core";
import {LoginResponse} from "../../models/auth/login-response";
import {assertLoggedIn, getCredentials, login} from "../../services/auth-service";
import {push} from "connected-react-router";
import {LINKED_APP_NAME} from "../../config/app-constants";

const {Storage} = Plugins;


describe('auth saga', () => {
    it('Watcher calls worker', () => {
        const generator = loginWatcher()
        expect(generator.next().value).toEqual(
            takeEvery(LOGIN, loginWorker)
        )
    })

    it('handles successful login call', () => {
        const credentials = {
            username: "TEST",
            password: "TEST"
        }

        const generator = loginWorker({payload: {credentials}})
        const loginResponse: LoginResponse = {
            email: "email",
            errors: [],
            expiresOn: "expiresOn",
            firstName: "firstName",
            isSuccess: true,
            lastName: "lastName",
            linkedApplication: [{
                application: "application",
                externalId: "externalId",
                $id: "$id"
            }],
            signedToken: "signedToken",
            statusCode: 5,
            userId: "userId",
            username: "username",
            $id: "$id",
        }

        expect(generator.next().value).toEqual(
            call(callLoginEndpoint, credentials)
        )

        expect(generator.next(loginResponse).value).toEqual(
            call(setCredentials, loginResponse)
        )

        expect(generator.next().value).toEqual(
            call(login, loginResponse)
        )

        expect(generator.next().value).toEqual(
            call(assertLoggedIn, loginResponse)
        )

    })

    it('handles failed login call', () => {
        const credentials = {
            username: "TEST",
            password: "TEST"
        }

        const generator = loginWorker({payload: {credentials}})
        const loginResponse = {
            loginResponse: false,
            signedToken: false,
            username: false,
            expiresOn: false
        }

        expect(generator.next(loginResponse).value).toEqual(
            call(callLoginEndpoint, credentials)
        )
    })


    it('tries to verify user, handling failure', () => {

        const [zipCode, lastFourOfSSID, clientId] = ['5435', '5193', 'clientId'];
        const action = {payload: {zipCode, lastFourOfSSID, clientId}}

        const generator = verifyWorker(action)

        const [signedToken, username, expiresOn] = ['signedToken', 'username', 'expiresOn']

        const credentials = {signedToken, username, expiresOn}

        expect(generator.next().value).toEqual(
            call(getCredentials)
        )
        expect(generator.next(credentials).value).toEqual(
            call(callVerifyClientNumber, {ZipCode: zipCode, Last4SSN: lastFourOfSSID, ClientNumber: clientId})
        )

        expect(generator.next().value).toEqual(
            put({
                payload:
                    {
                        id: 'toast1',
                        message: `Hmm, something's not right about the information you entered`,
                        type: 'default'
                    },
                type: 'TOAST_MESSAGE'
            } as any)
        )
        expect(generator.next().value).toEqual(
            undefined
        )
    })


    it('tries to verify user ', () => {

        const [zipCode, lastFourOfSSID, clientId] = ['5435', '5193', 'clientId'];
        const action = {payload: {zipCode, lastFourOfSSID, clientId}}


        const generator = verifyWorker(action)

        const [signedToken, username, expiresOn] = ['signedToken', 'username', 'expiresOn']

        const credentials = {signedToken, username, expiresOn}

        expect(generator.next().value).toEqual(
            call(getCredentials)
        )
        expect(generator.next(credentials).value).toEqual(
            call(callVerifyClientNumber, {ZipCode: zipCode, Last4SSN: lastFourOfSSID, ClientNumber: clientId})
        )

        expect(generator.next({any: 'value'} as any).value).toEqual(
            put({
                payload:
                    {
                        id: 'toast2',
                        message: 'Verified!',
                        type: 'default'
                    },
                type: 'TOAST_MESSAGE'
            } as any)
        )

        expect(generator.next().value).toEqual(
            call(callLinkAccount, {
                Application: LINKED_APP_NAME,
                ExternalApplicationId: clientId,
                SignedToken: signedToken,
                UserName: username,
                ExpiresOn: expiresOn
            })
        )
        expect(generator.next({isSuccess: 'true'} as any).value).toEqual(
            Storage.set({key: 'verified', value: 'true'})
        )
        expect(generator.next().value).toEqual(
            put(push('/logout'))
        )
    })
})