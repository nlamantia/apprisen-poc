import {Error} from "../common/error";
import {CaseDeposit} from "./case-deposit";

export interface PaymentHistoryResponse {
    $id: any;
    TrustBalance: any;
    CaseDeposits: CaseDeposit[];
    IsSuccess: boolean;
    Errors: Error[];
}