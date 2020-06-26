import {BankAccountType} from "../banking/bank-account-type";
import {State} from "../common/state";

export interface ClientAccountData {
    "$id": string;
    "dmpCaseId": number;
    "errors": Error[];
    "IsSuccess": boolean;
    "bankAccountTypes": BankAccountType[];
    "states": State[];
}