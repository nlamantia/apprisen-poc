import {LoginResponse} from "../models/auth/login-response";
import {LoginRequest} from "../models/auth/login-request";
import {ClientInformation} from "../models/case/client-information";
import {CaseSummary} from "../models/case/case-summary";
import {DebtDetail} from "../models/case/debt-detail";
import {getAuthHeaders, getClientId} from "./auth.service";
import {PaymentHistoryResponse} from "../models/payment/payment-history-response";
import {toast} from "react-toastify";
import {EmailRequest} from "../models/contact/email-request";

const ENV_ICM_BASE_URL = process.env.REACT_APP_SERVICE_BASE_URL;
const ENV_LOGIN_BASE_URL = process.env.REACT_APP_LOGIN_BASE_URL;

const ICM_BASE_URL = ENV_ICM_BASE_URL ? ENV_ICM_BASE_URL : "";
const LOGIN_BASE_URL = ENV_LOGIN_BASE_URL ? ENV_LOGIN_BASE_URL : "";

const CLIENT_INFORMATION_URL = "/api/client/getclientinformation/";
const PAY_OFF_FORECAST = "/api/case/payoffforecast/";
const CASE_SUMMARY_URL = "/api/case/getcasesummary/";
const DEBT_DETAIL_URL = "/api/case/getcasedebtdetail/";
// const LOGIN_URL = "/api/account/validateuser";
const LOGIN_URL = "/api/auth/login";
const MAKE_PAYMENT_URL = "/api/payment/createwebpayment";
const CLIENT_DATA_URL = "/api/client/getclientdata/";
const SEND_EMAIL_URL = "/api/client/sendemail/";
const PAYMENT_HISTORY_URL = "/api/case/getcasedepositdetail/";
const LINK_ACCOUNT_URL = "/api/client/link-application"
const VERIFY_CLIENT_NUMBER_URL = "/api/client/verifyclientnumber"


const BYPASS_NULL_HEADERS_FILTER_URL_LIST = [LOGIN_URL]

export const callLoginEndpoint = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await callApi(LOGIN_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(credentials)
    },"Logged in!");
};

export const callCaseSummaryEndpoint = (caseId: string): Promise<CaseSummary> => {
    return callApi(CASE_SUMMARY_URL + caseId);
};

export const callPaymentHistory = (caseId: string): Promise<PaymentHistoryResponse> => {
    return callApi(PAYMENT_HISTORY_URL + caseId);
};


export const callVerifyClientNumber = async(requestBody) : Promise<void> => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');

    return await callApi(VERIFY_CLIENT_NUMBER_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
    }, "Verification passed, congrats!")
}

export const callPayoffForecast = ({IncreaseAmount, IsOneTimePayment, caseId}): Promise<string> => {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let requestBody = JSON.stringify({caseNumber: caseId, IncreaseAmount, IsOneTimePayment});
    return callApi(PAY_OFF_FORECAST, {
        method: 'POST',
        body: requestBody,
        headers
    })

};

export const callSendEmail = async (emailRequest: EmailRequest): Promise<string> => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let requestBody = JSON.stringify(emailRequest);
    return callApi(SEND_EMAIL_URL, {
        method: 'POST',
        body: requestBody,
        headers
    })

};

export const callDebtDetailEndpoint = (caseId: string): Promise<DebtDetail> => {
    const headers = new Headers()
    headers.set("Content-Type", "application/json")

    return callApi(DEBT_DETAIL_URL + caseId,
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
    const externalId = await getClientId();

    return await callApi(CLIENT_DATA_URL + externalId);
};

export const callLinkAccount = async(requestBody) : Promise<void> => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');
    return await callApi(LINK_ACCOUNT_URL, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers
    })
}


export const callClientInformationEndpoint = async (): Promise<ClientInformation> => {
    const externalId = await getClientId();

    return await callApi(CLIENT_INFORMATION_URL + externalId);
};

export const callApi = async (url: string, options: RequestInit = {}, message: string = null): Promise<any> => {
    try {
        const headers = await getHeaders(options.headers as Headers, url)
        const response = await fetch(url, {
            ...options,
            headers
        });
        if (response.ok) {
            return response.json();
        } else {
            if (message) toast(`${message}`) // have to coax the message out by casting it as a string for some reason
            throw new Error(String(response.status));
        }
    } catch (message) {
        if (message) toast(`${message}`)
        throw new Error(String(message.status));
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
