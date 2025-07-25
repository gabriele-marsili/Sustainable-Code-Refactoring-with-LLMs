"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leap_1 = __importDefault(require("./leap"));
describe('A leap year', () => {
    it('is not very common', () => {
        expect((0, leap_1.default)(2015)).toBeFalsy();
    });
    it('is introduced every 4 years to adjust about a day', () => {
        expect((0, leap_1.default)(2016)).toBeTruthy();
    });
    it('is skipped every 100 years to remove an extra day', () => {
        expect((0, leap_1.default)(1900)).toBeFalsy();
    });
    it('is reintroduced every 400 years to adjust another day', () => {
        expect((0, leap_1.default)(2000)).toBeTruthy();
    });
    describe('Additional example of a leap year that', () => {
        it('is not a leap year', () => {
            expect((0, leap_1.default)(1978)).toBeFalsy();
        });
        it('is a common leap year', () => {
            expect((0, leap_1.default)(1992)).toBeTruthy();
        });
        it('is skipped every 100 years', () => {
            expect((0, leap_1.default)(2100)).toBeFalsy();
        });
        it('is reintroduced every 400 years', () => {
            expect((0, leap_1.default)(2400)).toBeTruthy();
        });
    });
});
