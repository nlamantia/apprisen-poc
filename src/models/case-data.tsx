import {Lender} from "./lender";

export interface CaseData {
    caseNumber: string,
    caseInceptionDate: string,
    nextPaymentDate: string,
    nextPaymentAmount: number,
    previousPaymentDate: string,
    previousPaymentAmount: number,
    startingDebtAmount: number,
    currentDebtAmount: number,
    lenders: Lender[]
}

export const data: CaseData = {
    caseNumber: '14532190',
    nextPaymentDate: '12/22/2019',
    nextPaymentAmount: 540.36,
    previousPaymentDate: '11/22/2019',
    previousPaymentAmount: 540.36,
    startingDebtAmount: 17356.21,
    currentDebtAmount: 8420.75,
    caseInceptionDate: '3/22/2016',
    lenders: []
};

export const Data = {};
