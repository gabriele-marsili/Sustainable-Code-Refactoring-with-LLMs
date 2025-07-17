"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const armstrong_numbers_1 = require("./armstrong-numbers");
describe('Armstrong Numbers', () => {
    it('Single digit numbers are Armstrong numbers', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(5)).toBeTruthy();
    });
    xit('There are no 2 digit Armstrong numbers', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(10)).toBeFalsy();
    });
    xit('Three digit number that is an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(153)).toBeTruthy();
    });
    xit('Three digit number that is not an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(100)).toBeFalsy();
    });
    xit('Four digit number that is an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(9474)).toBeTruthy();
    });
    xit('Four digit number that is not an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(9475)).toBeFalsy();
    });
    xit('Seven digit number that is an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(9926315)).toBeTruthy();
    });
    xit('Seven digit number that is not an Armstrong number', () => {
        expect((0, armstrong_numbers_1.isArmstrongNumber)(9926314)).toBeFalsy();
    });
});
