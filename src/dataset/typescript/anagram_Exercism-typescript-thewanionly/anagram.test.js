"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anagram_1 = require("./anagram");
describe('Anagram', () => {
    it('no matches', () => {
        const subject = new anagram_1.Anagram('diaper');
        const matches = subject.matches('hello', 'world', 'zombies', 'pants');
        expect(matches).toEqual([]);
    });
    it('detects simple anagram', () => {
        const subject = new anagram_1.Anagram('ant');
        const matches = subject.matches('tan', 'stand', 'at');
        expect(matches).toEqual(['tan']);
    });
    it('does not detect false positives', () => {
        const subject = new anagram_1.Anagram('galea');
        const matches = subject.matches('eagle');
        expect(matches).toEqual([]);
    });
    it('detects multiple anagrams', () => {
        const subject = new anagram_1.Anagram('master');
        const matches = subject.matches('stream', 'pigeon', 'maters');
        expect(matches).toEqual(['stream', 'maters']);
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
    it('detects multiple anagrams', () => {
        const subject = new anagram_1.Anagram('allergy');
        const matches = subject.matches('gallery', 'ballerina', 'regally', 'clergy', 'largely', 'leading');
        expect(matches).toEqual(['gallery', 'regally', 'largely']);
    });
    it('detects anagrams case-insensitively', () => {
        const subject = new anagram_1.Anagram('Orchestra');
        const matches = subject.matches('cashregister', 'Carthorse', 'radishes');
        expect(matches).toEqual(['Carthorse']);
    });
    it('does not detect a word as its own anagram', () => {
        const subject = new anagram_1.Anagram('banana');
        const matches = subject.matches('Banana');
        expect(matches).toEqual([]);
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
