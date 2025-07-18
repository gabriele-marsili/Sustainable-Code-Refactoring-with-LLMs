"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const armstrong_numbers_1 = require("./armstrong-numbers");
describe('Armstrong Numbers', () => {
    it('Single-digit numbers are Armstrong numbers', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(5)).toBeTruthy();
    });
    it('There are no two-digit Armstrong numbers', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(10)).toBeFalsy();
    });
    it('Three-digit number that is an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(153)).toBeTruthy();
    });
    it('Three-digit number that is not an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(100)).toBeFalsy();
    });
    it('Four-digit number that is an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(9474)).toBeTruthy();
    });
    it('Four-digit number that is not an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(9475)).toBeFalsy();
    });
    it('Seven-digit number that is an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(9926315)).toBeTruthy();
    });
    it('Seven-digit number that is not an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(9926314)).toBeFalsy();
    });
    it('Armstrong number containing seven zeroes', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(BigInt('186709961001538790100634132976990'))).toBeTruthy();
    });
    it('The largest and last Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(BigInt('115132219018763992565095597973971522401'))).toBeTruthy();
    });
});
