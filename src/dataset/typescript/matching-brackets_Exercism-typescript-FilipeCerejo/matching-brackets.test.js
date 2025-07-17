"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matching_brackets_1 = require("./matching-brackets");
describe('Matching Brackets', () => {
    it('paired square brackets', () => {
        expect((0, matching_brackets_1.isPaired)('[]')).toEqual(true);
    });
    xit('empty string', () => {
        expect((0, matching_brackets_1.isPaired)('')).toEqual(true);
    });
    xit('unpaired brackets', () => {
        expect((0, matching_brackets_1.isPaired)('[[')).toEqual(false);
    });
    xit('wrong ordered brackets', () => {
        expect((0, matching_brackets_1.isPaired)('}{')).toEqual(false);
    });
    xit('wrong closing bracket', () => {
        expect((0, matching_brackets_1.isPaired)('{]')).toEqual(false);
    });
    xit('paired with whitespace', () => {
        expect((0, matching_brackets_1.isPaired)('{ }')).toEqual(true);
    });
    xit('partially paired brackets', () => {
        expect((0, matching_brackets_1.isPaired)('{[])')).toEqual(false);
    });
    xit('simple nested brackets', () => {
        expect((0, matching_brackets_1.isPaired)('{[]}')).toEqual(true);
    });
    xit('several paired brackets', () => {
        expect((0, matching_brackets_1.isPaired)('{}[]')).toEqual(true);
    });
    xit('paired and nested brackets', () => {
        expect((0, matching_brackets_1.isPaired)('([{}({}[])])')).toEqual(true);
    });
    xit('unopened closing brackets', () => {
        expect((0, matching_brackets_1.isPaired)('{[)][]}')).toEqual(false);
    });
    xit('unpaired and nested brackets', () => {
        expect((0, matching_brackets_1.isPaired)('([{])')).toEqual(false);
    });
    xit('paired and wrong nested brackets', () => {
        expect((0, matching_brackets_1.isPaired)('[({]})')).toEqual(false);
    });
    xit('paired and incomplete brackets', () => {
        expect((0, matching_brackets_1.isPaired)('{}[')).toEqual(false);
    });
    xit('too many closing brackets', () => {
        expect((0, matching_brackets_1.isPaired)('[]]')).toEqual(false);
    });
    xit('math expression', () => {
        expect((0, matching_brackets_1.isPaired)('(((185 + 223.85) * 15) - 543)/2')).toEqual(true);
    });
    xit('complex latex expression', () => {
        expect((0, matching_brackets_1.isPaired)('\\left(\\begin{array}{cc} \\frac{1}{3} & x\\\\ \\mathrm{e}^{x} &... x^2 \\end{array}\\right)')).toEqual(true);
    });
});
