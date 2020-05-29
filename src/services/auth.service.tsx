import {LoginResponse} from '../models/auth/login-response';
import moment from 'moment'
import {Plugins} from '@capacitor/core';
import {LINKED_APP_NAME} from "../config/app-constants";

const {Storage} = Plugins;

export const isAuthenticated = async (parCreds?: LoginResponse) : Promise<Boolean> => {
    try {
        const creds : LoginResponse = parCreds ? parCreds : await getCredentials()
        if (!creds) { return false }
        return !(await areCredentialsExpired(creds))
    } catch(e) {
        return false
    }
}

export const areCredentialsExpired = async (parCreds?: LoginResponse ) : Promise<Boolean> => {
    const creds = parCreds ? parCreds : await getCredentials()
    const { expiresOn } = creds
    return Date.now() > new Date(Number(expiresOn) / 10000).getTime()
}

export const login = (credentials : LoginResponse) => {
    try {
        let creds = JSON.stringify(credentials);
        Storage.set({key: 'credentials', value: creds })
    } catch(e) {
        console.log('Could not set credentials!')
    }
}


export const logout = () => {
    console.log('called logout')
    Storage.remove({key: 'credentials'}).then(() => console.log('removed credential'));
}

export const getCredentials = async(): Promise<LoginResponse> => {
    return new Promise( async (resolve, reject) => {
        try {
            const credString = (await Storage.get({key: 'credentials'})).value;
            if (credString) {
                resolve(credString ? JSON.parse(credString) : null);
            } else {
                reject("Can't get credentials!")
            }
        } catch(e) {
            reject(e)
        }
    })
}

export const isVerified = async () => {
    try {
        const caseId = await getClientId();
        return !!caseId || !!(await Storage.get({key: 'verified'}))
    } catch(e) {
        return false
    }
}


export const getClientId = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const credentials = await getCredentials()
            const { externalId } =  credentials.linkedApplication.filter( e =>  e.application === LINKED_APP_NAME )[0]
            resolve(externalId)
        } catch(e) {
            reject(null)
        }
    })
}

export const getAuthHeaders = (): Promise<Headers> => {
    return new Promise(async (resolve, reject) => {
        const headers = new Headers();
        try {
            const {signedToken, username, expiresOn} = await getCredentials()
            await assertLoggedIn({signedToken, username, expiresOn})

            headers.append("Authorization-Token", signedToken)
            headers.append('Username', username)
            headers.append('ExpiresOn', expiresOn)
        } catch(e) {
            reject(e)
        }
        resolve(headers)
    })
}

export const assertLoggedIn = async credentials => {
    const {signedToken, username, expiresOn} = await credentials ? credentials : getCredentials()
    if (new Date().getMilliseconds() >= new Date(expiresOn).getMilliseconds()) {
        throw new Error("Credentials are expired;")
    }
    if (signedToken === '' || !signedToken ) {
        throw new Error("Invalid token! User must not be logged in!");
    }
}

