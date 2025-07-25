"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anagram_1 = require("./anagram");
describe('Anagram', () => {
    it('no matches', () => {
        const subject = new anagram_1.Anagram('diaper');
        const matches = subject.matches('hello', 'world', 'zombies', 'pants');
        expect(matches).toEqual([]);
    });
    it('detects two anagrams', () => {
        const subject = new anagram_1.Anagram('solemn');
        const matches = subject.matches('lemons', 'cherry', 'melons');
        expect(matches).toEqual(['lemons', 'melons']);
    });
    it('does not detect anagram subsets', () => {
        const subject = new anagram_1.Anagram('good');
        const matches = subject.matches('dog', 'goody');
        expect(matches).toEqual([]);
    });
    it('detects anagram', () => {
        const subject = new anagram_1.Anagram('listen');
        const matches = subject.matches('enlists', 'google', 'inlets', 'banana');
        expect(matches).toEqual(['inlets']);
    });
    it('detects three anagrams', () => {
        const subject = new anagram_1.Anagram('allergy');
        const matches = subject.matches('gallery', 'ballerina', 'regally', 'clergy', 'largely', 'leading');
        expect(matches).toEqual(['gallery', 'regally', 'largely']);
    });
    it('detects multiple anagrams with different case', () => {
        const subject = new anagram_1.Anagram('nose');
        const matches = subject.matches('Eons', 'ONES');
        expect(matches).toEqual(['Eons', 'ONES']);
    });
    it('does not detect non-anagrams with identical checksum', () => {
        const subject = new anagram_1.Anagram('mass');
        const matches = subject.matches('last');
        expect(matches).toEqual([]);
    });
    it('detects anagrams case-insensitively', () => {
        const subject = new anagram_1.Anagram('Orchestra');
        const matches = subject.matches('cashregister', 'Carthorse', 'radishes');
        expect(matches).toEqual(['Carthorse']);
    });
    it('detects anagrams using case-insensitive subject', () => {
        const subject = new anagram_1.Anagram('Orchestra');
        const matches = subject.matches('cashregister', 'carthorse', 'radishes');
        expect(matches).toEqual(['carthorse']);
    });
    it('detects anagrams using case-insensitive possible matches', () => {
        const subject = new anagram_1.Anagram('orchestra');
        const matches = subject.matches('cashregister', 'Carthorse', 'radishes');
        expect(matches).toEqual(['Carthorse']);
    });
    it('does not detect an anagram if the original word is repeated', () => {
        const subject = new anagram_1.Anagram('go');
        const matches = subject.matches('go Go GO');
        expect(matches).toEqual([]);
    });
    it('anagrams must use all letters exactly once', () => {
        const subject = new anagram_1.Anagram('tapper');
        const matches = subject.matches('patter');
        expect(matches).toEqual([]);
    });
    it('words are not anagrams of themselves', () => {
        const subject = new anagram_1.Anagram('BANANA');
        const matches = subject.matches('BANANA');
        expect(matches).toEqual([]);
    });
    it('words are not anagrams of themselves even if letter case is partially different', () => {
        const subject = new anagram_1.Anagram('BANANA');
        const matches = subject.matches('Banana');
        expect(matches).toEqual([]);
    });
    it('words are not anagrams of themselves even if letter case is completely different', () => {
        const subject = new anagram_1.Anagram('BANANA');
        const matches = subject.matches('Banana');
        expect(matches).toEqual([]);
    });
    it('words other than themselves can be anagrams', () => {
        const subject = new anagram_1.Anagram('LISTEN');
        const matches = subject.matches('LISTEN', 'Silent');
        expect(matches).toEqual(['Silent']);
    });
    it('matches() accepts string arguments', () => {
        const subject = new anagram_1.Anagram('ant');
        const matches = subject.matches('stand', 'tan', 'at');
        expect(matches).toEqual(['tan']);
    });
    it('matches() accepts single string argument', () => {
        const subject = new anagram_1.Anagram('ant');
        const matches = subject.matches('tan');
        expect(matches).toEqual(['tan']);
    });
});
