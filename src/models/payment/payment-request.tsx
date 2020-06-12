export interface PaymentRequest {
    clientNumber: number;
    caseNumber: number;
    effectiveDate: string;
    routingNumber: string;
    accountNumber: string;
    amount: number;
    bankAccountType: string;
    primaryNameOnAccount: string;
    clientComments: string;
}