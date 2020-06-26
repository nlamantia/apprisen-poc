import React from "react";
import {getLenderListForGraph} from "./account-overview";
import {BRAND_COLORS} from "../../common/app-constants";

describe('Account overview component tests', () => {
    it('Get graph lenders - equal to brand colors', () => {
        let lenders = generateLenderList(BRAND_COLORS.length).sort((l1, l2) => {
            return l2.OriginalBalance - l1.OriginalBalance;
        });

        let result = getLenderListForGraph(lenders, BRAND_COLORS);
        expect(result.length).toEqual(BRAND_COLORS.length);
        expect(result[0].CurrentBalance).toEqual(900);
        expect(result[0].OriginalBalance).toEqual(9000);
        expect(result[8].CurrentBalance).toEqual(100);
        expect(result[8].OriginalBalance).toEqual(1000);
    });

    it('Get graph lenders - less than brand colors', () => {
        let lenders = generateLenderList(7).sort((l1, l2) => {
            return l2.OriginalBalance - l1.OriginalBalance;
        });

        let result = getLenderListForGraph(lenders, BRAND_COLORS);
        expect(result.length).toEqual(7);
        expect(result[0].CurrentBalance).toEqual(700);
        expect(result[0].OriginalBalance).toEqual(7000);
        expect(result[6].CurrentBalance).toEqual(100);
        expect(result[6].OriginalBalance).toEqual(1000);
    });

    it('Get graph lenders - greater than brand colors', () => {
        let lenders = generateLenderList(12).sort((l1, l2) => {
            return l2.OriginalBalance - l1.OriginalBalance;
        });

        let result = getLenderListForGraph(lenders, BRAND_COLORS);
        expect(result.length).toEqual(BRAND_COLORS.length);
        expect(result[0].CurrentBalance).toEqual(1200);
        expect(result[0].OriginalBalance).toEqual(12000);
        expect(result[result.length - 1].CurrentBalance).toEqual(1000);
        expect(result[result.length - 1].OriginalBalance).toEqual(10000);
    });

    it('Get graph lenders - 1 brand color', () => {
        let lenders = generateLenderList(5).sort((l1, l2) => {
            return l2.OriginalBalance - l1.OriginalBalance;
        });

        let result = getLenderListForGraph(lenders, ["#232323"]);
        expect(result.length).toEqual(1);
        expect(result[0].CurrentBalance).toEqual(1500);
        expect(result[0].OriginalBalance).toEqual(15000);
    });

    it('Get graph lenders - 1 lender 2 colors', () => {
        let lenders = generateLenderList(1);

        let result = getLenderListForGraph(lenders, ["#232323", "#454545"]);
        expect(result.length).toEqual(1);
        expect(result[0].CurrentBalance).toEqual(100);
        expect(result[0].OriginalBalance).toEqual(1000);
    });
});

function generateLenderList(num: number) {
    let lenders = [];
    for (let i = 0; i < num; i++) {
        lenders.push({
            AccountNumber: "-",
            Apr: 0,
            CreditorName: "Other",
            CurrentBalance: (i + 1) * 100,
            DebtId: "-111",
            DebtType: 1,
            LastCreditorPaymentDate: new Date(),
            OriginalBalance: (i + 1) * 1000,
            $id: "-1"
        })
    }
    return lenders;
}