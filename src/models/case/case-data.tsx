import {Lender} from "../lender";

export interface CaseData {
    CaseNumber: string,
    CaseInceptionDate: string,
    NextPaymentDate: string,
    NextPaymentAmount: number,
    PreviousPaymentDate: string,
    PreviousPaymentAmount: number,
    StartingDebtAmount: number,
    CurrentDebtAmount: number,
    Lenders: Lender[]
}

export const data: CaseData = {
    CaseNumber: '14532190',
    NextPaymentDate: '12/22/2019',
    NextPaymentAmount: 540.36,
    PreviousPaymentDate: '11/22/2019',
    PreviousPaymentAmount: 540.36,
    StartingDebtAmount: 17356.21,
    CurrentDebtAmount: 8420.75,
    CaseInceptionDate: '3/22/2016',
    Lenders: []
};

export const Data = {};
