import { LoginResponse } from "../models/auth/login-response";
import { LoginRequest } from "../models/auth/login-request";
// import { CaseSummary } from "../models/case/case-summary";
// import { DebtDetail } from "../models/case/debt-detail";
import { ClientInformation } from "../models/case/client-information";
import authService from "../services/auth.service";
import { CaseSummary } from "../models/case/case-summary";
import { restErrorHandler } from "../services/rest-error-handler";
import { DebtDetail } from "../models/case/debt-detail";

export const restService = {

    callLoginEndpoint: async (credentials: LoginRequest): Promise<LoginResponse> => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(credentials)
        });
        return response.json();
    },

    callCaseSummaryEndpoint: async (externalId: string): Promise<CaseSummary> => {
        const headers = await restService.createHeaders();
        console.log('created headers: ' + JSON.stringify(headers));
        const caseSummary = await restService.callApi(CASE_SUMMARY_URL + externalId, { headers: headers });
        return caseSummary;
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
            restErrorHandler.handleError(error);
            return {};
        }
    },

    callDebtDetailEndpoint: async (externalId: string): Promise<DebtDetail> => {
        const headers = await restService.createHeaders();
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

} 


const CLIENT_INFORMATION_URL = "http://localhost:8080/api/case/client-details/";
const CASE_SUMMARY_URL = "http://localhost:8080/api/case/case-summary/";
const DEBT_DETAIL_URL = "http://localhost:8080/api/case/debt-details/";
const LOGIN_URL = "http://localhost:8080/api/auth/login";
