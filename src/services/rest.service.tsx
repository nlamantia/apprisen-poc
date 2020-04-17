import {LoginResponse} from "../models/auth/login-response";
import {LoginRequest} from "../models/auth/login-request";
import {ClientInformation} from "../models/case/client-information";
import authService from "../services/auth.service";
import {CaseSummary} from "../models/case/case-summary";
import {restErrorHandler} from "../services/rest-error-handler";
import {DebtDetail} from "../models/case/debt-detail";
import {PaymentRequest} from "../models/payment/payment-request";

export const restService = {

    callLoginEndpoint: async (credentials: LoginRequest): Promise<LoginResponse> => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch("https://apprisen-facade-test.herokuapp.com/api/auth/login", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(credentials)
        });
        return response.json();
    },

    callCaseSummaryEndpoint: (credentials: LoginResponse): Promise<CaseSummary> => {
        const headers = new Headers();

        const {signedToken, username, expiresOn} = credentials

        // todo consolidate header logic
        headers.append("Authorization-Token", signedToken)
        headers.append('Username', username)
        headers.append('ExpiresOn', expiresOn)

        const { linkedApplication: [ {}, { externalId} ] } = credentials

        return restService.callApi(CASE_SUMMARY_URL + externalId, { headers } );
    },

    callPayoffForecast: ({ credentials, caseNumber, IncreaseAmount, IsOneTimePayment }) : Promise<string> => {
        // todo swithc to call credentials service
        const headers = new Headers();

        const { signedToken, username, expiresOn } = credentials

        headers.append("Authorization-Token", signedToken)
        headers.append('Username', username)
        headers.append('ExpiresOn', expiresOn)
        headers.append('Content-Type', 'application/json')
        console.log({signedToken})
        console.log({username})
        console.log({expiresOn})

        const { linkedApplication: [{}, { externalId } ] } = credentials

        let requestBody = JSON.stringify({ caseNumber: externalId, IncreaseAmount, IsOneTimePayment });
        return restService.callApi(PAY_OFF_FORECAST, {
            method: 'POST',
            headers: headers,
            body: requestBody
        })

    },

    callMakePayment: (credentials: LoginResponse, paymentDetails: PaymentRequest) : Promise<string> => {
        const headers = new Headers();

        const {signedToken, username, expiresOn} = credentials;

        headers.append("Authorization-Token", signedToken);
        headers.append('Username', username);
        headers.append('ExpiresOn', expiresOn);
        headers.append('Content-Type', 'application/json');
        console.log(JSON.stringify(headers));

        let requestBody = JSON.stringify(paymentDetails);
        console.log(requestBody);
        return restService.callApi(MAKE_PAYMENT_URL, {
            method: 'POST',
            headers: headers,
            body: requestBody
        })
    },

    callGetClientData: (credentials: LoginResponse) : Promise<string> => {
        const headers = new Headers();

        const {signedToken, username, expiresOn} = credentials;
        const {linkedApplication: [{}, { externalId }]} = credentials;

        headers.append("Authorization-Token", signedToken);
        headers.append('Username', username);
        headers.append('ExpiresOn', expiresOn);

        return restService.callApi(CLIENT_DATA_URL + externalId, {  headers: headers });
    },

    callApi: async (url: string, options: RequestInit): Promise<any> => {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(String(response.status));
            }
        } catch (error) {
            // todo handle errors in store
            restErrorHandler.handleError(error);
            return {};
        }
    },

    callDebtDetailEndpoint: async (credentials: LoginResponse): Promise<DebtDetail> => {

        const headers = new Headers();
        const {signedToken, username, expiresOn} = credentials

        headers.append("Authorization-Token", signedToken)
        headers.append('Username', username)
        headers.append('ExpiresOn', expiresOn)

        const { linkedApplication: [ {}, { externalId} ] } = credentials

        const debtDetail = await restService.callApi(DEBT_DETAIL_URL + externalId, { headers: headers });
        return debtDetail;
    },

    callClientInformationEndpoint: async (externalId: string): Promise<ClientInformation> => {
        const headers = await restService.createHeaders();
        return (await fetch(CLIENT_INFORMATION_URL + externalId, { headers: headers })).json();
    },

    createHeaders: async () => {
        const headerValues = await authService.getAuthHeaders();
        const headers = new Headers();
        headers.append("Authorization-Token", headerValues.signedToken)
        headers.append('Username', headerValues.username)
        headers.append('ExpiresOn', headerValues.expiresOn)
        return headers;
    }

};

const CLIENT_INFORMATION_URL = "https://apprisen-facade-test.herokuapp.com/api/case/client-details/";
const PAY_OFF_FORECAST = "https://apprisen-facade-test.herokuapp.com/api/case/payoffforecast/";
const CASE_SUMMARY_URL = "https://apprisen-facade-test.herokuapp.com/api/case/case-summary/";
const DEBT_DETAIL_URL = "https://apprisen-facade-test.herokuapp.com/api/case/debt-details/";
const MAKE_PAYMENT_URL = "https://apprisen-facade-test.herokuapp.com/api/case/payment";
const CLIENT_DATA_URL = "https://apprisen-facade-test.herokuapp.com/api/client/getclientdata/";
const LOGIN_URL = "https://apprisen-facade-test.herokuapp.com/api/auth/login";

