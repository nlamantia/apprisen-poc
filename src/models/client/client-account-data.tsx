import {BankAccountType} from "../banking/bank-account-type";
import {State} from "../common/state";
import {Error} from "../common/error";

export interface ClientAccountData {
    "$id": string;
    "DmpCaseId": number;
    "Errors": Error[];
    "IsSuccess": boolean;
    "BankAccountTypes": BankAccountType[];
    "States": State[];
}