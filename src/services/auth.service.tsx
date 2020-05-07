import {LoginResponse} from '../models/auth/login-response';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

export const isAuthenticated = async () => {
    const cred = (await Storage.get({key: 'credentials'})).value
    return cred != null;
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
        const caseId = await getCaseId();
        return !!caseId
    } catch(e) {
        return false
    }
}


export const getCaseId = () => {
    const APP_NAME = 'One Time Payment'
    return new Promise(async (resolve, reject) => {
        try {
            const credentials = await getCredentials()
            console.log(credentials)
            console.log(credentials.linkedApplication.filter( e =>  e.application === APP_NAME )[0
                ])
            const { externalId } =  credentials.linkedApplication.filter( e =>  e.application === APP_NAME )[0]
            resolve(externalId)
        } catch(e) {
            reject("Could not get case id!")
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

