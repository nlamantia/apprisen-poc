export interface PaymentRequest {
    clientNumber: Number;
    caseNumber: Number;
    effectiveDate: string;
    routingNumber: string;
    accountNumber: string;
    amount: Number;
    bankAccountType: string;
    primaryNameOnAccount: string;
    clientComments: string;
}