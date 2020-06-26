import {LoginResponse} from '../models/auth/login-response';
import {Plugins} from '@capacitor/core';
import {LINKED_APP_NAME} from "../common/app-constants";

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
    if (!creds) return true;
    const { ExpiresOn } = creds;
    if (!ExpiresOn) return true;
    return Date.now() >= new Date(Number(ExpiresOn / BigInt(10000))).getTime()
}

export const login = (credentials : LoginResponse) => {
    try {
        let creds = JSON.stringify(credentials, credsStringifier);
        Storage.set({key: 'credentials', value: creds})
    } catch(e) {
        console.error('Could not set credentials!', e)
    }
}

const credsStringifier = (key, value) =>
    typeof value === 'bigint'
        ? value.toString()
        : value // return everything else unchanged

export const JSON_OBJECT_PARSER = (key, value) => {
    if (key === 'ExpiresOn') {
        return BigInt(value);
    }
    return value;
};

export const logout = () => {
    Storage.remove({key: 'credentials'})
}

export const getCredentials = async(): Promise<LoginResponse> => {
    return new Promise( async (resolve, reject) => {
        try {
            const credString = (await Storage.get({key: 'credentials'})).value;
            if (credString) {
                resolve(credString ? JSON.parse(credString, JSON_OBJECT_PARSER) : null);
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
        const clientId = await getClientId();
        return !!clientId || !!(await Storage.get({key: 'verified'}))
    } catch(e) {
        return false
    }
}


export const getClientId = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const credentials = await getCredentials()
            const { ExternalId } =  credentials.LinkedApplication.filter(e =>  e.Application === LINKED_APP_NAME )[0]
            resolve(ExternalId)
        } catch(e) {
            reject(null)
        }
    })
}

export const getAuthHeaders = (): Promise<Headers> => {
    return new Promise(async (resolve, reject) => {
        const headers = new Headers();
        try {
            const {SignedToken, Username, ExpiresOn} = await getCredentials()
            await assertLoggedIn({SignedToken: SignedToken, Username: Username, ExpiresOn: ExpiresOn})

            headers.append("Authorization-Token", SignedToken)
            headers.append('Username', Username)
            headers.append('ExpiresOn', "" + ExpiresOn)
        } catch(e) {
            reject(e)
        }
        resolve(headers)
    })
}

export const assertLoggedIn = async credentials => {
    const {SignedToken} = await credentials ? credentials : await getCredentials();
    const expired = await areCredentialsExpired(credentials);
    if (expired) {
        throw new Error("Credentials are expired;")
    }
    if (!SignedToken || SignedToken === '') {
        throw new Error("Invalid token! User must not be logged in!");
    }
}

