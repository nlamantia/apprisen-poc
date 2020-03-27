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

    logout: () => {
        console.log('called logout')
        Storage.remove({ key: 'credentials' }).then(() => console.log('removed credential'));
    },

    getCredentials: async () => {
        const credString = (await Storage.get({ key: 'credentials' })).value;
        return credString ? JSON.parse(credString) : null;
    },

    getAuthHeaders: async () => {
        const credString = (await Storage.get({ key: 'credentials' })).value;
        console.log('retrieved creds from storage: ' + credString);
        const cred: LoginResponse = credString ? JSON.parse(credString) : null;
        return cred ? {signedToken: cred.signedToken, username: cred.username, expiresOn: cred.expiresOn} : {};
    }
}

export default authService;
