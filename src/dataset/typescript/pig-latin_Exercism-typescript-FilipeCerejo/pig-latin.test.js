"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pig_latin_1 = require("./pig-latin");
describe('ay is added to words that start with vowels', () => {
    it('word beginning with a', () => {
        const expected = 'appleay';
        expect((0, pig_latin_1.translate)('apple')).toEqual(expected);
    });
    xit('word beginning with e', () => {
        const expected = 'earay';
        expect((0, pig_latin_1.translate)('ear')).toEqual(expected);
    });
    xit('word beginning with i', () => {
        const expected = 'iglooay';
        expect((0, pig_latin_1.translate)('igloo')).toEqual(expected);
    });
    xit('word beginning with o', () => {
        const expected = 'objectay';
        expect((0, pig_latin_1.translate)('object')).toEqual(expected);
    });
    xit('word beginning with u', () => {
        const expected = 'underay';
        expect((0, pig_latin_1.translate)('under')).toEqual(expected);
    });
    xit('word beginning with a vowel and followed by a qu', () => {
        const expected = 'equalay';
        expect((0, pig_latin_1.translate)('equal')).toEqual(expected);
    });
});
describe('first letter and ay are moved to the end of words that start with consonants', () => {
    xit('word beginning with p', () => {
        const expected = 'igpay';
        expect((0, pig_latin_1.translate)('pig')).toEqual(expected);
    });
    xit('word beginning with k', () => {
        const expected = 'oalakay';
        expect((0, pig_latin_1.translate)('koala')).toEqual(expected);
    });
    xit('word beginning with x', () => {
        const expected = 'enonxay';
        expect((0, pig_latin_1.translate)('xenon')).toEqual(expected);
    });
    xit('word beginning with q without a following u', () => {
        const expected = 'atqay';
        expect((0, pig_latin_1.translate)('qat')).toEqual(expected);
    });
});
describe('some letter clusters are treated like a single consonant', () => {
    xit('word beginning with ch', () => {
        const expected = 'airchay';
        expect((0, pig_latin_1.translate)('chair')).toEqual(expected);
    });
    xit('word beginning with qu', () => {
        const expected = 'eenquay';
        expect((0, pig_latin_1.translate)('queen')).toEqual(expected);
    });
    xit('word beginning with qu and a preceding consonant', () => {
        const expected = 'aresquay';
        expect((0, pig_latin_1.translate)('square')).toEqual(expected);
    });
    xit('word beginning with th', () => {
        const expected = 'erapythay';
        expect((0, pig_latin_1.translate)('therapy')).toEqual(expected);
    });
    xit('word beginning with thr', () => {
        const expected = 'ushthray';
        expect((0, pig_latin_1.translate)('thrush')).toEqual(expected);
    });
    xit('word beginning with sch', () => {
        const expected = 'oolschay';
        expect((0, pig_latin_1.translate)('school')).toEqual(expected);
    });
});
describe('position of y in a word determines if it is a consonant or a vowel', () => {
    xit('y is treated like a consonant at the beginning of a word', () => {
        const expected = 'ellowyay';
        expect((0, pig_latin_1.translate)('yellow')).toEqual(expected);
    });
    xit('y as second letter in two letter word', () => {
        const expected = 'ymay';
        expect((0, pig_latin_1.translate)('my')).toEqual(expected);
    });
});
describe('phrases are translated', () => {
    xit('a whole phrase', () => {
        const expected = 'ickquay astfay unray';
        expect((0, pig_latin_1.translate)('quick fast run')).toEqual(expected);
    });
});
