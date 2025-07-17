"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const armstrong_numbers_1 = __importDefault(require("./armstrong-numbers"));
describe('Armstrong Numbers', () => {
    it('Single digit numbers are Armstrong numbers', () => {
        expect(armstrong_numbers_1.default.isArmstrongNumber(5)).toBeTruthy();
    });
    it('There are no 2 digit Armstrong numbers', () => {
        expect(armstrong_numbers_1.default.isArmstrongNumber(10)).toBeFalsy();
    });
    it('Three digit number that is an Armstrong number', () => {
        expect(armstrong_numbers_1.default.isArmstrongNumber(153)).toBeTruthy();
    });
    it('Three digit number that is not an Armstrong number', () => {
        expect(armstrong_numbers_1.default.isArmstrongNumber(100)).toBeFalsy();
    });
    it('Four digit number that is an Armstrong number', () => {
        expect(armstrong_numbers_1.default.isArmstrongNumber(9474)).toBeTruthy();
    });
    it('Four digit number that is not an Armstrong number', () => {
        expect(armstrong_numbers_1.default.isArmstrongNumber(9475)).toBeFalsy();
    });
    it('Seven digit number that is an Armstrong number', () => {
        expect(armstrong_numbers_1.default.isArmstrongNumber(9926315)).toBeTruthy();
    });
    it('Seven digit number that is not an Armstrong number', () => {
        expect(armstrong_numbers_1.default.isArmstrongNumber(9926314)).toBeFalsy();
    });
});
