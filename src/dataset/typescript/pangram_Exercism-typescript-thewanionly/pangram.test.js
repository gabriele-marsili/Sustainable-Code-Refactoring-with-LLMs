"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pangram_1 = require("./pangram");
describe('Pangram()', () => {
    it('empty sentence', () => {
        expect((0, pangram_1.isPangram)('')).toBe(false);
    });
    it('perfect lower case', () => {
        expect((0, pangram_1.isPangram)('abcdefghijklmnopqrstuvwxyz')).toBe(true);
    });
    it('only lower case', () => {
        expect((0, pangram_1.isPangram)('the quick brown fox jumps over the lazy dog')).toBe(true);
    });
    it("missing the letter 'x'", () => {
        expect((0, pangram_1.isPangram)('a quick movement of the enemy will jeopardize five gunboats')).toBe(false);
    });
    it("missing the letter 'h'", () => {
        expect((0, pangram_1.isPangram)('five boxing wizards jump quickly at it')).toBe(false);
    });
    it('with underscores', () => {
        expect((0, pangram_1.isPangram)('the_quick_brown_fox_jumps_over_the_lazy_dog')).toBe(true);
    });
    it('with numbers', () => {
        expect((0, pangram_1.isPangram)('the 1 quick brown fox jumps over the 2 lazy dogs')).toBe(true);
    });
    it('missing letters replaced by numbers', () => {
        expect((0, pangram_1.isPangram)('7h3 qu1ck brown fox jumps ov3r 7h3 lazy dog')).toBe(false);
    });
    it('mixed case and punctuation', () => {
        expect((0, pangram_1.isPangram)('"Five quacking Zephyrs jolt my wax bed."')).toBe(true);
    });
    it('case insensitive', () => {
        expect((0, pangram_1.isPangram)('the quick brown fox jumps over with lazy FX')).toBe(false);
    });
});
