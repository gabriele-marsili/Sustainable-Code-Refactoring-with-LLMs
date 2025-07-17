"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luhn_1 = __importDefault(require("./luhn"));
describe('Luhn', () => {
    it('single digit strings can not be valid', () => {
        expect(luhn_1.default.valid('1')).toBeFalsy();
    });
    it('a single zero is invalid', () => {
        expect(luhn_1.default.valid('0')).toBeFalsy();
    });
    xit('a simple valid SIN that remains valid if reversed', () => {
        expect(luhn_1.default.valid('059')).toBeTruthy();
    });
    it('a valid Canadian SIN', () => {
        expect(luhn_1.default.valid('055 444 285')).toBeTruthy();
    });
    it('invalid Canadian SIN', () => {
        expect(luhn_1.default.valid('055 444 286')).toBeFalsy();
    });
    it('invalid credit card', () => {
        expect(luhn_1.default.valid('8273 1232 7352 0569')).toBeFalsy();
    });
    it('valid strings with a non-digit included become invalid', () => {
        expect(luhn_1.default.valid('055a 444 285')).toBeFalsy();
    });
    it('valid strings with punctuation included become invalid', () => {
        expect(luhn_1.default.valid('055-444-285')).toBeFalsy();
    });
    it('valid strings with symbols included become invalid', () => {
        expect(luhn_1.default.valid('055£ 444$ 285')).toBeFalsy();
    });
    it('single zero with space is invalid', () => {
        expect(luhn_1.default.valid(' 0')).toBeFalsy();
    });
    it('input digit 9 is correctly converted to output digit 9', () => {
        expect(luhn_1.default.valid('091')).toBeTruthy();
    });
});
