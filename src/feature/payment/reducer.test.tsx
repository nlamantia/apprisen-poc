import {paymentReducer} from "./reducer";
import {PaymentHistoryResponse} from "../../models/payment/payment-history-response";
import {setPaymentHistory} from "./action";

const initialState = paymentReducer(undefined, null);

describe('payment reducer', () => {
    describe('payment history reducer functions', () => {
        it('assert default state', () => {
            const {paymentHistory} = initialState;
            expect(paymentHistory).toBeDefined();
            expect(paymentHistory.length).toBeDefined();
            expect(paymentHistory.length).toEqual(0);
        });

        it('assert contains payments', () => {
            const expectedNumberOfPayments = 6;
            const {caseDeposits} = fakeResponse;
            expect(caseDeposits).toBeDefined();
            expect(caseDeposits.length).toBeDefined();
            expect(caseDeposits.length).toEqual(expectedNumberOfPayments);

            const newState = paymentReducer(initialState, setPaymentHistory(caseDeposits));
            const {paymentHistory} = newState;
            expect(paymentHistory).toBeDefined();
            expect(paymentHistory.length).toBeDefined();
            expect(paymentHistory.length).toEqual(expectedNumberOfPayments);

            for (let i in paymentHistory) {
                let paymentInHistory = paymentHistory[i];
                let paymentInResponse = caseDeposits[i];

                expect(paymentInHistory.postedDate).toBeDefined();
                expect(paymentInHistory.postedDate).toEqual(paymentInResponse.postedDate);

                expect(paymentInHistory.amount).toBeDefined();
                expect(paymentInHistory.amount).toEqual(paymentInResponse.amount);
            }
        });
    });
});

const fakeResponse = {
    caseDeposits: [
        {
            $id: "2",
            postedDate: 1587081600000,
            amount: 670.0000
        },
        {
            $id: "3",
            postedDate: 1584403200000,
            amount: 670.0000
        },
        {
            $id: "4",
            postedDate: 1581984000000,
            amount: 670.0000
        },
        {
            $id: "5",
            postedDate: 1579219200000,
            amount: 670.0000
        },
        {
            $id: "6",
            postedDate: 1576540800000,
            amount: 670.0000
        },
        {
            $id: "7",
            postedDate: 1574035200000,
            amount: 654.0000
        }
    ],
    IsSuccess: true,
    errors: []
} as PaymentHistoryResponse;