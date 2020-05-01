import {Error} from "../common/error";
import {CaseDeposit} from "./case-deposit";

export interface PaymentHistoryResponse {
    $id: any;
    trustBalance: any;
    caseDeposits: CaseDeposit[];
    IsSuccess: boolean;
    errors: Error[];
}