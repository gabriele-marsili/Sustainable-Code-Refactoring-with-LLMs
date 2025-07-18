"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isogram_1 = __importDefault(require("./isogram"));
describe('Check if the given string is an isogram', () => {
    it('empty string', () => {
        const expected = true;
        expect(isogram_1.default.isIsogram('')).toEqual(expected);
    });
    it('isogram with only lower case characters', () => {
        const expected = true;
        expect(isogram_1.default.isIsogram('isogram')).toEqual(expected);
    });
    it('word with one duplicated character', () => {
        const expected = false;
        expect(isogram_1.default.isIsogram('eleven')).toEqual(expected);
    });
    it('longest reported english isogram', () => {
        const expected = true;
        expect(isogram_1.default.isIsogram('subdermatoglyphic')).toEqual(expected);
    });
    it('word with duplicated character in mixed case', () => {
        const expected = false;
        expect(isogram_1.default.isIsogram('Alphabet')).toEqual(expected);
    });
    it('hypothetical isogrammic word with hyphen', () => {
        const expected = true;
        expect(isogram_1.default.isIsogram('thumbscrew-japingly')).toEqual(expected);
    });
    it('isogram with duplicated hyphen', () => {
        const expected = true;
        expect(isogram_1.default.isIsogram('six-year-old')).toEqual(expected);
    });
    it('made-up name that is an isogram', () => {
        const expected = true;
        expect(isogram_1.default.isIsogram('Emily Jung Schwartzkopf')).toEqual(expected);
    });
    it('duplicated character in the middle', () => {
        const expected = false;
        expect(isogram_1.default.isIsogram('accentor')).toEqual(expected);
    });
});
