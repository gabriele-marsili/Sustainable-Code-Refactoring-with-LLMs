"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acronym_1 = require("./acronym");
describe('Acronym are produced from', () => {
    it('title cased phrases', () => {
        expect((0, acronym_1.parse)('Portable Network Graphics')).toEqual('PNG');
    });
    xit('other title cased phrases', () => {
        expect((0, acronym_1.parse)('Ruby on Rails')).toEqual('ROR');
    });
    xit('inconsistently cased phrases', () => {
        expect((0, acronym_1.parse)('HyperText Markup Language')).toEqual('HTML');
    });
    xit('phrases with punctuation', () => {
        expect((0, acronym_1.parse)('First In, First Out')).toEqual('FIFO');
    });
    xit('other phrases with punctuation', () => {
        expect((0, acronym_1.parse)('PHP: Hypertext Preprocessor')).toEqual('PHP');
    });
    xit('phrases with punctuation and sentence casing', () => {
        expect((0, acronym_1.parse)('Complementary metal-oxide semiconductor')).toEqual('CMOS');
    });
});
