"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reverse_string_1 = require("./reverse-string");
describe('Reverse String', () => {
    it('an empty string', () => {
        const expected = '';
        expect((0, reverse_string_1.reverse)('')).toEqual(expected);
    });
    xit('a word', () => {
        const expected = 'tobor';
        expect((0, reverse_string_1.reverse)('robot')).toEqual(expected);
    });
    xit('a capitalized word', () => {
        const expected = 'nemaR';
        expect((0, reverse_string_1.reverse)('Ramen')).toEqual(expected);
    });
    xit('a sentence with punctuation', () => {
        const expected = `!yrgnuh m'I`;
        expect((0, reverse_string_1.reverse)(`I'm hungry!`)).toEqual(expected);
    });
    xit('a palindrome', () => {
        const expected = 'racecar';
        expect((0, reverse_string_1.reverse)('racecar')).toEqual(expected);
    });
});
