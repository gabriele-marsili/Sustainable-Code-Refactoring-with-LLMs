"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roman_numerals_1 = require("./roman-numerals");
describe('toRoman()', () => {
    it('converts 1', () => expect((0, roman_numerals_1.toRoman)(1)).toEqual('I'));
    it('converts 2', () => expect((0, roman_numerals_1.toRoman)(2)).toEqual('II'));
    it('converts 3', () => expect((0, roman_numerals_1.toRoman)(3)).toEqual('III'));
    it('converts 4', () => expect((0, roman_numerals_1.toRoman)(4)).toEqual('IV'));
    it('converts 5', () => expect((0, roman_numerals_1.toRoman)(5)).toEqual('V'));
    it('converts 6', () => expect((0, roman_numerals_1.toRoman)(6)).toEqual('VI'));
    it('converts 9', () => expect((0, roman_numerals_1.toRoman)(9)).toEqual('IX'));
    it('converts 27', () => expect((0, roman_numerals_1.toRoman)(27)).toEqual('XXVII'));
    it('converts 48', () => expect((0, roman_numerals_1.toRoman)(48)).toEqual('XLVIII'));
    it('converts 49', () => expect((0, roman_numerals_1.toRoman)(49)).toEqual('XLIX'));
    it('converts 59', () => expect((0, roman_numerals_1.toRoman)(59)).toEqual('LIX'));
    it('converts 93', () => expect((0, roman_numerals_1.toRoman)(93)).toEqual('XCIII'));
    it('converts 141', () => expect((0, roman_numerals_1.toRoman)(141)).toEqual('CXLI'));
    it('converts 163', () => expect((0, roman_numerals_1.toRoman)(163)).toEqual('CLXIII'));
    it('converts 402', () => expect((0, roman_numerals_1.toRoman)(402)).toEqual('CDII'));
    it('converts 575', () => expect((0, roman_numerals_1.toRoman)(575)).toEqual('DLXXV'));
    it('converts 911', () => expect((0, roman_numerals_1.toRoman)(911)).toEqual('CMXI'));
    it('converts 1024', () => expect((0, roman_numerals_1.toRoman)(1024)).toEqual('MXXIV'));
    it('converts 3000', () => expect((0, roman_numerals_1.toRoman)(3000)).toEqual('MMM'));
});
