import { FirstDisbursementDate } from "./first-disbursement-date";

export interface CaseSummary {
    ClientName: string;
    CurrentTrustBalance: number;
    CurrentMonthlyPayment: number;
    Errors: any[];
    EstimatedBalance: number;
    FirstDisbursementDate: FirstDisbursementDate;
    IsSuccess: boolean;
    MonthlyDueOn: number;
    NextPaymentDueOn: Date;
    TotalMonthlyDeposit: number;
    $id: string;
}