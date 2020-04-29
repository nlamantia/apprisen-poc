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
            postedDate: "2020-04-17T00:00:00",
            amount: 670.0000
        },
        {
            $id: "3",
            postedDate: "2020-03-17T00:00:00",
            amount: 670.0000
        },
        {
            $id: "4",
            postedDate: "2020-02-18T00:00:00",
            amount: 670.0000
        },
        {
            $id: "5",
            postedDate: "2020-01-17T00:00:00",
            amount: 670.0000
        },
        {
            $id: "6",
            postedDate: "2019-12-17T00:00:00",
            amount: 670.0000
        },
        {
            $id: "7",
            postedDate: "2019-11-18T00:00:00",
            amount: 654.0000
        }
    ],
    IsSuccess: true,
    errors: []
} as PaymentHistoryResponse;