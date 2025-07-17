"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luhn_1 = require("./luhn");
describe('Luhn', () => {
    it('single digit strings can not be valid', () => {
        expect((0, luhn_1.valid)('1')).toBeFalsy();
    });
    it('a single zero is invalid', () => {
        expect((0, luhn_1.valid)('0')).toBeFalsy();
    });
    it('a simple valid SIN that remains valid if reversed', () => {
        expect((0, luhn_1.valid)('059')).toBeTruthy();
    });
    it('a valid Canadian SIN', () => {
        expect((0, luhn_1.valid)('055 444 285')).toBeTruthy();
    });
    it('invalid Canadian SIN', () => {
        expect((0, luhn_1.valid)('055 444 286')).toBeFalsy();
    });
    it('invalid credit card', () => {
        expect((0, luhn_1.valid)('8273 1232 7352 0569')).toBeFalsy();
    });
    it('valid strings with a non-digit included become invalid', () => {
        expect((0, luhn_1.valid)('055a 444 285')).toBeFalsy();
    });
    it('valid strings with punctuation included become invalid', () => {
        expect((0, luhn_1.valid)('055-444-285')).toBeFalsy();
    });
    it('valid strings with symbols included become invalid', () => {
        expect((0, luhn_1.valid)('055£ 444$ 285')).toBeFalsy();
    });
    it('single zero with space is invalid', () => {
        expect((0, luhn_1.valid)(' 0')).toBeFalsy();
    });
    it('input digit 9 is correctly converted to output digit 9', () => {
        expect((0, luhn_1.valid)('091')).toBeTruthy();
    });
});
