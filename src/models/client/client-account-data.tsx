import {BankAccountType} from "../banking/bank-account-type";
import {State} from "../common/state";

export interface ClientAccountData {
    "$id": string;
    "dmpCaseId": Number;
    "errors": Error[];
    "IsSuccess": boolean;
    "bankAccountTypes": BankAccountType[];
    "states": State[];
}