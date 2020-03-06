import { LoginRequest } from '../models/auth/login-request';
import { LoginResponse } from '../models/auth/login-response';
import { Plugins } from '@capacitor/core';
import { restService } from './rest.service';
const { Storage } = Plugins;

const authService = {

    isAuthenticated: async () => {
        const cred = (await Storage.get({ key: 'credentials' })).value
        return cred != null;
    },

    login: async (credential: LoginRequest): Promise<LoginResponse> => {
        const loginResponse = await restService.callLoginEndpoint(credential);
        if (loginResponse && loginResponse.signedToken && loginResponse.username && loginResponse.expiresOn) {
            console.log('storing credential:' + JSON.stringify(loginResponse));
            await Storage.set({
                key: 'credentials',
                value: JSON.stringify(loginResponse)
            });
        }
        return loginResponse;
    },

    logout: () => {
        console.log('called logout')
        Storage.remove({ key: 'credentials' }).then(() => console.log('removed credential'));
    },

    getCaseId: async () => {
        const credString = (await Storage.get({ key: 'credentials' })).value;
        const cred: LoginResponse = credString ? JSON.parse(credString) : null;
        return cred ? cred.linkedApplication[0].externalId : "";
    },

    getAuthHeaders: async () => {
        const credString = (await Storage.get({ key: 'credentials' })).value;
        console.log('retrieved creds from storage: ' + credString);
        const cred: LoginResponse = credString ? JSON.parse(credString) : null;
        return cred ? {signedToken: cred.signedToken, username: cred.username, expiresOn: cred.expiresOn} : {};
    }
}

export default authService;
