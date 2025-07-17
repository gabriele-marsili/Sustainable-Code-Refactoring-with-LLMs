"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const two_fer_1 = __importDefault(require("./two-fer"));
describe('TwoFer', () => {
    it('no name given', () => {
        const expected = 'One for you, one for me.';
        expect(two_fer_1.default.twoFer()).toEqual(expected);
    });
    it('a name given', () => {
        const expected = 'One for Alice, one for me.';
        expect(two_fer_1.default.twoFer('Alice')).toEqual(expected);
    });
    it('another name given', () => {
        const expected = 'One for Bob, one for me.';
        expect(two_fer_1.default.twoFer('Bob')).toEqual(expected);
    });
});
