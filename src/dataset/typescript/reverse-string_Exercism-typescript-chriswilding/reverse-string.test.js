"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reverse_string_1 = __importDefault(require("./reverse-string"));
describe('Reverse String', () => {
    it('an empty string', () => {
        const expected = '';
        expect(reverse_string_1.default.reverse('')).toEqual(expected);
    });
    it('a word', () => {
        const expected = 'tobor';
        expect(reverse_string_1.default.reverse('robot')).toEqual(expected);
    });
    it('a capitalized word', () => {
        const expected = 'nemaR';
        expect(reverse_string_1.default.reverse('Ramen')).toEqual(expected);
    });
    it('a sentence with punctuation', () => {
        const expected = `!yrgnuh m'I`;
        expect(reverse_string_1.default.reverse(`I'm hungry!`)).toEqual(expected);
    });
    it('a palindrome', () => {
        const expected = 'racecar';
        expect(reverse_string_1.default.reverse('racecar')).toEqual(expected);
    });
});
