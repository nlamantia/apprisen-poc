import {LoginResponse} from "../models/auth/login-response";
import {LoginRequest} from "../models/auth/login-request";
import {ClientInformation} from "../models/case/client-information";
import {CaseSummary} from "../models/case/case-summary";
import {DebtDetail} from "../models/case/debt-detail";
import {getAuthHeaders, getCaseId, getCredentials} from "./auth.service";
import {PaymentHistoryResponse} from "../models/payment/payment-history-response";

export const BASE_URL = "https://apprisen-facade-test.herokuapp.com"

const CLIENT_INFORMATION_URL = BASE_URL + "/api/case/client-details/";
const PAY_OFF_FORECAST = BASE_URL + "/api/case/payoffforecast/";
const CASE_SUMMARY_URL = BASE_URL + "/api/case/case-summary/";
const DEBT_DETAIL_URL = BASE_URL + "/api/case/debt-details/";
const LOGIN_URL = BASE_URL + "/api/auth/login";
const MAKE_PAYMENT_URL = BASE_URL + "/api/case/payment";
const CLIENT_DATA_URL = BASE_URL + "/api/client/getclientdata/";
const PAYMENT_HISTORY_URL = BASE_URL + "/api/case/payment-history/";
const LINK_ACCOUNT_URL = BASE_URL + "api/account/LinkAccountWithExternalApp"
const VERIFY_CLIENT_NUMBER_URL = BASE_URL + "/api/Client/VerifyClientNumber"


const BYPASS_NULL_HEADERS_FILTER_URL_LIST = [LOGIN_URL]

export const callLoginEndpoint = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await callApi(LOGIN_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(credentials)
    });
};

export const callCaseSummaryEndpoint = async (): Promise<CaseSummary> => {
    const externalId = await getCaseId()
    return callApi(CASE_SUMMARY_URL + externalId);
};

export const callPaymentHistory = async (): Promise<PaymentHistoryResponse> => {
    // commented out for now because no payment history for regular test user
    // const externalId = await getCaseId();
    const externalId = 9902398;

    return callApi(PAYMENT_HISTORY_URL + externalId);
    // return getFakePaymentHistoryResponse();
};


export const callVerifyClientNumber = async(requestBody) : Promise<void> => {
    const headers = new Headers()

    return await callApi(VERIFY_CLIENT_NUMBER_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
    })
}

export const callPayoffForecast = async ({IncreaseAmount, IsOneTimePayment}): Promise<string> => {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const externalId = await getCaseId()

    let requestBody = JSON.stringify({caseNumber: externalId, IncreaseAmount, IsOneTimePayment});
    return callApi(PAY_OFF_FORECAST, {
        method: 'POST',
        body: requestBody,
        headers
    })

};

export const callDebtDetailEndpoint = async (): Promise<DebtDetail> => {
    const externalId = await getCaseId()
    const headers = new Headers()
    headers.set("Content-Type", "application/json")

    return await callApi(DEBT_DETAIL_URL + externalId,
        {
            headers
        }
    );
};

export const callMakePayment = async (paymentDetails: PaymentRequest) : Promise<string> => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let requestBody = JSON.stringify(paymentDetails);
    return await callApi(MAKE_PAYMENT_URL, {
        method: 'POST',
        headers: headers,
        body: requestBody
    })
};

export const callGetClientData = async () : Promise<string> => {
    const externalId = await getCaseId();

    return await callApi(CLIENT_DATA_URL + externalId);
};

export const callLinkAccount = async(requestBody) : Promise<void> => {
    return await callApi(LINK_ACCOUNT_URL, {
        method: 'POST',
        body: JSON.stringify(requestBody)
    })
}


export const callClientInformationEndpoint = async (): Promise<ClientInformation> => {
    const externalId = await getCaseId();

    return await callApi(CLIENT_INFORMATION_URL + externalId);
};

export const callApi = async (url: string, options: RequestInit = {}): Promise<any> => {
    try {
        const headers = await getHeaders(options.headers as Headers, url)
        const response = await fetch(url, {
            ...options,
            headers
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(String(response.status));
        }
    } catch (error) {
        // todo handle errors in store
        console.log(error)
        return {};
    }
};

const getHeaders = async (parameterHeaders: Headers, url: string) : Promise<Headers> => {
    let authHeaders: Headers
    try {
        authHeaders = await getAuthHeaders()
    } catch(e) {
        if (!BYPASS_NULL_HEADERS_FILTER_URL_LIST.includes(url)) throw new Error("Headers could not be generated, user must not be logged in!")
        authHeaders = new Headers()
    }
    const headers: Headers = new Headers()
    const mergeHeaders = (base: Headers, merger: Headers) : void => merger.forEach((value, key) => base.set(key,value))
    if (authHeaders) {
        mergeHeaders(headers, authHeaders)
    }
    if (parameterHeaders) {
        mergeHeaders(headers, parameterHeaders)
    }

    return headers
};
