"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roman_numerals_1 = __importDefault(require("./roman-numerals"));
describe('RomanNumerals', () => {
    it('1 is a single I', () => {
        const expected = 'I';
        expect(roman_numerals_1.default.roman(1)).toEqual(expected);
    });
    it('2 is two I\'s', () => {
        const expected = 'II';
        expect(roman_numerals_1.default.roman(2)).toEqual(expected);
    });
    it('3 is three I\'s', () => {
        const expected = 'III';
        expect(roman_numerals_1.default.roman(3)).toEqual(expected);
    });
    it('4, being 5 - 1, is IV', () => {
        const expected = 'IV';
        expect(roman_numerals_1.default.roman(4)).toEqual(expected);
    });
    it('5 is a single V', () => {
        const expected = 'V';
        expect(roman_numerals_1.default.roman(5)).toEqual(expected);
    });
    it('6, being 5 + 1, is VI', () => {
        const expected = 'VI';
        expect(roman_numerals_1.default.roman(6)).toEqual(expected);
    });
    it('9, being 10 - 1, is IX', () => {
        const expected = 'IX';
        expect(roman_numerals_1.default.roman(9)).toEqual(expected);
    });
    it('20 is two X\'s', () => {
        const expected = 'XXVII';
        expect(roman_numerals_1.default.roman(27)).toEqual(expected);
    });
    it('48 is not 50 - 2 but rather 40 + 8', () => {
        const expected = 'XLVIII';
        expect(roman_numerals_1.default.roman(48)).toEqual(expected);
    });
    it('49 is not 40 + 5 + 4 but rather 50 - 10 + 10 - 1', () => {
        const expected = 'XLIX';
        expect(roman_numerals_1.default.roman(49)).toEqual(expected);
    });
    it('50 is a single L', () => {
        const expected = 'LIX';
        expect(roman_numerals_1.default.roman(59)).toEqual(expected);
    });
    it('90, being 100 - 10, is XC', () => {
        const expected = 'XCIII';
        expect(roman_numerals_1.default.roman(93)).toEqual(expected);
    });
    it('100 is a single C', () => {
        const expected = 'CXLI';
        expect(roman_numerals_1.default.roman(141)).toEqual(expected);
    });
    it('60, being 50 + 10, is LX', () => {
        const expected = 'CLXIII';
        expect(roman_numerals_1.default.roman(163)).toEqual(expected);
    });
    it('400, being 500 - 100, is CD', () => {
        const expected = 'CDII';
        expect(roman_numerals_1.default.roman(402)).toEqual(expected);
    });
    it('500 is a single D', () => {
        const expected = 'DLXXV';
        expect(roman_numerals_1.default.roman(575)).toEqual(expected);
    });
    it('900, being 1000 - 100, is CM', () => {
        const expected = 'CMXI';
        expect(roman_numerals_1.default.roman(911)).toEqual(expected);
    });
    it('1000 is a single M', () => {
        const expected = 'MXXIV';
        expect(roman_numerals_1.default.roman(1024)).toEqual(expected);
    });
    it('3000 is three M\'s', () => {
        const expected = 'MMM';
        expect(roman_numerals_1.default.roman(3000)).toEqual(expected);
    });
});
