"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pig_latin_1 = __importDefault(require("./pig-latin"));
describe('ay is added to words that start with vowels', () => {
    it('word beginning with a', () => {
        const expected = 'appleay';
        expect(pig_latin_1.default.translate('apple')).toEqual(expected);
    });
    it('word beginning with e', () => {
        const expected = 'earay';
        expect(pig_latin_1.default.translate('ear')).toEqual(expected);
    });
    it('word beginning with i', () => {
        const expected = 'iglooay';
        expect(pig_latin_1.default.translate('igloo')).toEqual(expected);
    });
    it('word beginning with o', () => {
        const expected = 'objectay';
        expect(pig_latin_1.default.translate('object')).toEqual(expected);
    });
    it('word beginning with u', () => {
        const expected = 'underay';
        expect(pig_latin_1.default.translate('under')).toEqual(expected);
    });
    it('word beginning with a vowel and followed by a qu', () => {
        const expected = 'equalay';
        expect(pig_latin_1.default.translate('equal')).toEqual(expected);
    });
});
describe('first letter and ay are moved to the end of words that start with consonants', () => {
    it('word beginning with p', () => {
        const expected = 'igpay';
        expect(pig_latin_1.default.translate('pig')).toEqual(expected);
    });
    it('word beginning with k', () => {
        const expected = 'oalakay';
        expect(pig_latin_1.default.translate('koala')).toEqual(expected);
    });
    it('word beginning with x', () => {
        const expected = 'enonxay';
        expect(pig_latin_1.default.translate('xenon')).toEqual(expected);
    });
    it('word beginning with q without a following u', () => {
        const expected = 'atqay';
        expect(pig_latin_1.default.translate('qat')).toEqual(expected);
    });
});
describe('some letter clusters are treated like a single consonant', () => {
    it('word beginning with ch', () => {
        const expected = 'airchay';
        expect(pig_latin_1.default.translate('chair')).toEqual(expected);
    });
    it('word beginning with qu', () => {
        const expected = 'eenquay';
        expect(pig_latin_1.default.translate('queen')).toEqual(expected);
    });
    it('word beginning with qu and a preceding consonant', () => {
        const expected = 'aresquay';
        expect(pig_latin_1.default.translate('square')).toEqual(expected);
    });
    it('word beginning with th', () => {
        const expected = 'erapythay';
        expect(pig_latin_1.default.translate('therapy')).toEqual(expected);
    });
    it('word beginning with thr', () => {
        const expected = 'ushthray';
        expect(pig_latin_1.default.translate('thrush')).toEqual(expected);
    });
    it('word beginning with sch', () => {
        const expected = 'oolschay';
        expect(pig_latin_1.default.translate('school')).toEqual(expected);
    });
});
describe('position of y in a word determines if it is a consonant or a vowel', () => {
    it('y is treated like a consonant at the beginning of a word', () => {
        const expected = 'ellowyay';
        expect(pig_latin_1.default.translate('yellow')).toEqual(expected);
    });
    it('y as second letter in two letter word', () => {
        const expected = 'ymay';
        expect(pig_latin_1.default.translate('my')).toEqual(expected);
    });
});
describe('phrases are translated', () => {
    it('a whole phrase', () => {
        const expected = 'ickquay astfay unray';
        expect(pig_latin_1.default.translate('quick fast run')).toEqual(expected);
    });
});
