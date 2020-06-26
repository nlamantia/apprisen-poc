import React from "react";
import {getLenderListForGraph} from "./account-overview";
import {BRAND_COLORS} from "../../common/app-constants";

describe('Account overview component tests', () => {
    it('Get graph lenders - equal to brand colors', () => {
        let lenders = generateLenderList(BRAND_COLORS.length).sort((l1, l2) => {
            return l2.originalBalance - l1.originalBalance;
        });

        let result = getLenderListForGraph(lenders, BRAND_COLORS);
        expect(result.length).toEqual(BRAND_COLORS.length);
        expect(result[0].currentBalance).toEqual(900);
        expect(result[0].originalBalance).toEqual(9000);
        expect(result[8].currentBalance).toEqual(100);
        expect(result[8].originalBalance).toEqual(1000);
    });

    it('Get graph lenders - less than brand colors', () => {
        let lenders = generateLenderList(7).sort((l1, l2) => {
            return l2.originalBalance - l1.originalBalance;
        });

        let result = getLenderListForGraph(lenders, BRAND_COLORS);
        expect(result.length).toEqual(7);
        expect(result[0].currentBalance).toEqual(700);
        expect(result[0].originalBalance).toEqual(7000);
        expect(result[6].currentBalance).toEqual(100);
        expect(result[6].originalBalance).toEqual(1000);
    });

    it('Get graph lenders - greater than brand colors', () => {
        let lenders = generateLenderList(12).sort((l1, l2) => {
            return l2.originalBalance - l1.originalBalance;
        });

        let result = getLenderListForGraph(lenders, BRAND_COLORS);
        expect(result.length).toEqual(BRAND_COLORS.length);
        expect(result[0].currentBalance).toEqual(1200);
        expect(result[0].originalBalance).toEqual(12000);
        expect(result[result.length - 1].currentBalance).toEqual(1000);
        expect(result[result.length - 1].originalBalance).toEqual(10000);
    });

    it('Get graph lenders - 1 brand color', () => {
        let lenders = generateLenderList(5).sort((l1, l2) => {
            return l2.originalBalance - l1.originalBalance;
        });

        let result = getLenderListForGraph(lenders, ["#232323"]);
        expect(result.length).toEqual(1);
        expect(result[0].currentBalance).toEqual(1500);
        expect(result[0].originalBalance).toEqual(15000);
    });

    it('Get graph lenders - 1 lender 2 colors', () => {
        let lenders = generateLenderList(1);

        let result = getLenderListForGraph(lenders, ["#232323", "#454545"]);
        expect(result.length).toEqual(1);
        expect(result[0].currentBalance).toEqual(100);
        expect(result[0].originalBalance).toEqual(1000);
    });
});

function generateLenderList(num: number) {
    let lenders = [];
    for (let i = 0; i < num; i++) {
        lenders.push({
            accountNumber: "-",
            apr: 0,
            creditorName: "Other",
            currentBalance: (i + 1) * 100,
            debtId: "-111",
            debtType: 1,
            lastCreditorPaymentDate: new Date(),
            originalBalance: (i + 1) * 1000,
            $id: "-1"
        })
    }
    return lenders;
}