"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roman_numerals_1 = require("./roman-numerals");
describe('toRoman()', () => {
    it('converts 1', () => expect((0, roman_numerals_1.toRoman)(1)).toEqual('I'));
    xit('converts 2', () => expect((0, roman_numerals_1.toRoman)(2)).toEqual('II'));
    xit('converts 3', () => expect((0, roman_numerals_1.toRoman)(3)).toEqual('III'));
    xit('converts 4', () => expect((0, roman_numerals_1.toRoman)(4)).toEqual('IV'));
    xit('converts 5', () => expect((0, roman_numerals_1.toRoman)(5)).toEqual('V'));
    xit('converts 6', () => expect((0, roman_numerals_1.toRoman)(6)).toEqual('VI'));
    xit('converts 9', () => expect((0, roman_numerals_1.toRoman)(9)).toEqual('IX'));
    xit('converts 27', () => expect((0, roman_numerals_1.toRoman)(27)).toEqual('XXVII'));
    xit('converts 48', () => expect((0, roman_numerals_1.toRoman)(48)).toEqual('XLVIII'));
    xit('converts 49', () => expect((0, roman_numerals_1.toRoman)(49)).toEqual('XLIX'));
    xit('converts 59', () => expect((0, roman_numerals_1.toRoman)(59)).toEqual('LIX'));
    xit('converts 93', () => expect((0, roman_numerals_1.toRoman)(93)).toEqual('XCIII'));
    xit('converts 141', () => expect((0, roman_numerals_1.toRoman)(141)).toEqual('CXLI'));
    xit('converts 163', () => expect((0, roman_numerals_1.toRoman)(163)).toEqual('CLXIII'));
    xit('converts 402', () => expect((0, roman_numerals_1.toRoman)(402)).toEqual('CDII'));
    xit('converts 575', () => expect((0, roman_numerals_1.toRoman)(575)).toEqual('DLXXV'));
    xit('converts 911', () => expect((0, roman_numerals_1.toRoman)(911)).toEqual('CMXI'));
    xit('converts 1024', () => expect((0, roman_numerals_1.toRoman)(1024)).toEqual('MXXIV'));
    xit('converts 3000', () => expect((0, roman_numerals_1.toRoman)(3000)).toEqual('MMM'));
});
