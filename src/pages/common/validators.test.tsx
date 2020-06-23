import {validateNumber, validatePositiveDecimal, validateText, validateAlphanumericOnly, validateNonEmptyText, validateNonEmptyString} from "./validators";

describe('Validation', () => {
    describe('Validate Number', () => {
        it('validate number', () => {
            expect(validateNumber(5)).toBe(true);
        });

        it('validate decimal', () => {
            expect(validateNumber(5.5)).toBe(true);
        });

        it('validate non number', () => {
            expect(validateNumber('test')).toBe(false);
        });

        it('validate null', () => {
            expect(validateNumber(null)).toBe(false);
        });

        it('validate undefined', () => {
            expect(validateNumber(undefined)).toBe(false);
        });
    });

    describe('Validate positive decimal', () => {
        it('validate positive decimal', () => {
            expect(validatePositiveDecimal(5.85)).toBe(true);
        });

        it('validate positive number', () => {
            expect(validatePositiveDecimal(5)).toBe(true);
        });

        it('validate negative decimal', () => {
            expect(validatePositiveDecimal(-5.2)).toBe(false);
        });

        it('validate negative number', () => {
            expect(validatePositiveDecimal(-5)).toBe(false);
        });

        it('validate non number', () => {
            expect(validatePositiveDecimal('test')).toBe(false);
        });

        it('validate null', () => {
            expect(validatePositiveDecimal(null)).toBe(false);
        });

        it('validate undefined', () => {
            expect(validatePositiveDecimal(undefined)).toBe(false);
        });
    });

    describe('Validate Text', () => {

        it('validate text', () => {
            expect(validateText('test')).toBe(true);
        });

        
        it('validate text with numbers', () => {
            expect(validateText('test98')).toBe(true);
        });

    });

    describe('Validate Alphanumeric', () => {
        it('validate number', () => {
            expect(validateAlphanumericOnly(5)).toBe(false);
        });

        it('validate decimal', () => {
            expect(validateAlphanumericOnly(5.5)).toBe(false);
        });

        it('validate text', () => {
            expect(validateAlphanumericOnly('test')).toBe(true);
        });

        
        it('validate text with numbers', () => {
            expect(validateAlphanumericOnly('test98')).toBe(true);
        });

    });

    describe('Validate Non Empty Text', () => {
        it('validate empty text', () => {
            expect(validateNonEmptyText("")).toBe(false);
        });

        it('validate text', () => {
            expect(validateAlphanumericOnly('test')).toBe(true);
        });

    });

    describe('Validate Non Empty String', () => {
        it('validate empty string', () => {
            expect(validateNonEmptyString('')).toBe(false);
        });

        it('validate text', () => {
            expect(validateNonEmptyString('test')).toBe(true);
        });

    });

});