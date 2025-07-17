"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const two_fer_1 = require("./two-fer");
describe('TwoFer', () => {
    it('no name given', () => {
        const expected = 'One for you, one for me.';
        expect((0, two_fer_1.twoFer)()).toEqual(expected);
    });
    xit('a name given', () => {
        const expected = 'One for Alice, one for me.';
        expect((0, two_fer_1.twoFer)('Alice')).toEqual(expected);
    });
    xit('another name given', () => {
        const expected = 'One for Bob, one for me.';
        expect((0, two_fer_1.twoFer)('Bob')).toEqual(expected);
    });
});
