import { FirstDisbursementDate } from "./first-disbursement-date";

export interface CaseSummary {
    clientName: string;
    currentMonthlyPayment: number;
    errors: any[];
    estimatedBalance: number;
    firstDisbursementDate: FirstDisbursementDate;
    isSuccess: boolean;
    monthlyDueOn: number;
    nextPaymentDueOn: Date;
    totalMonthlyDeposit: number;
    $id: string;
}