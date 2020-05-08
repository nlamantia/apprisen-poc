import React from 'react'
import {calculateProgress, printDate} from "./utility-functions";

describe('Utility Functions', () => {
    describe('Print Date', () => {
        it('print date undefined', () => {
            expect(printDate(undefined)).toBe("");
        });

        it('print date null', () => {
            expect(printDate(null)).toBe("");
        });

        it('print date undefined ticks', () => {
            expect(printDate(new Date(-1))).toBe("12/31/1969");
        });

        it('print date 1 day past epoch', () => {
            expect(printDate(new Date(86400000))).toBe("1/1/1970");
        });

        it('print date 5/22/2016', () => {
            expect(printDate(new Date(1463937780000))).toBe("5/22/2016");
        });

        it('print date 8/4/2050', () => {
            expect(printDate(new Date(2543242332000))).toBe("8/4/2050");
        });
    });

    describe('Calculate Progress', () => {
        it('made no payments, balance increased only', () => {
            expect(calculateProgress(1, 6200)).toEqual(0);
        });

        it('negative current balance', () => {
            expect(calculateProgress(6000, -1)).toEqual(0);
        });

        it('negative starting balance', () => {
            expect(calculateProgress(-1, 0)).toEqual(0);
        });

        it('0 starting and current balances', () => {
            expect(calculateProgress(0, 0)).toEqual(0);
        });

        it('undefined starting and current balances', () => {
            expect(calculateProgress(undefined, undefined)).toEqual(0);
        });

        it('null starting and current balances', () => {
            expect(calculateProgress(null, null)).toEqual(0);
        });

        it('paid off all debt', () => {
            expect(calculateProgress(15000, 0)).toEqual(1);
        });

        it('paid off half of debt', () => {
            expect(calculateProgress(15000, 7500)).toBeCloseTo(0.5);
        });

        it('paid off two-thirds of debt', () => {
            expect(calculateProgress(15000, 5000)).toBeCloseTo(0.667);
        });
    });
});