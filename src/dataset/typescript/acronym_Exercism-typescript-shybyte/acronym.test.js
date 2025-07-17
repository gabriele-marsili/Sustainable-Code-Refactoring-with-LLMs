"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const acronym_1 = __importDefault(require("./acronym"));
describe('Acronym are produced from', () => {
    it('title cased phrases', () => {
        expect(acronym_1.default.parse('Portable Network Graphics')).toEqual('PNG');
    });
    it('other title cased phrases', () => {
        expect(acronym_1.default.parse('Ruby on Rails')).toEqual('ROR');
    });
    it('umlauts', () => {
        expect(acronym_1.default.parse('Über Rübe')).toEqual('ÜR');
    });
    it('inconsistently cased phrases', () => {
        expect(acronym_1.default.parse('HyperText Markup Language')).toEqual('HTML');
    });
    it('phrases with punctuation', () => {
        expect(acronym_1.default.parse('First In, First Out')).toEqual('FIFO');
    });
    it('other phrases with punctuation', () => {
        expect(acronym_1.default.parse('PHP: Hypertext Preprocessor')).toEqual('PHP');
    });
    it('phrases with punctuation and sentence casing', () => {
        expect(acronym_1.default.parse('Complementary metal-oxide semiconductor')).toEqual('CMOS');
    });
});
