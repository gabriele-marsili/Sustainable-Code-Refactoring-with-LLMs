"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrabble_score_1 = require("./scrabble-score");
describe('Scrabble', () => {
    it('scores an empty word as zero', () => expect((0, scrabble_score_1.score)('')).toEqual(0));
    xit('scores a null as zero', () => expect((0, scrabble_score_1.score)(undefined)).toEqual(0));
    xit('scores a very short word', () => expect((0, scrabble_score_1.score)('a')).toEqual(1));
    xit('scores the word by the number of letters', () => expect((0, scrabble_score_1.score)('street')).toEqual(6));
    xit('scores more complicated words with more', () => expect((0, scrabble_score_1.score)('quirky')).toEqual(22));
    xit('scores case insensitive words', () => expect((0, scrabble_score_1.score)('OXYPHENBUTAZONE')).toEqual(41));
});
