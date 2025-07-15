"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import bob_1 from './bob';
describe('Bob', () => {
    it('stating something', () => {
        const result = (0, bob_1.hey)('Tom-ay-to, tom-aaaah-to.');
        expect(result).toEqual('Whatever.');
    });
    it('shouting', () => {
        const result = (0, bob_1.hey)('WATCH OUT!');
        expect(result).toEqual('Whoa, chill out!');
    });
    it('shouting gibberish', () => {
        const result = (0, bob_1.hey)('FCECDFCAAB');
        expect(result).toEqual('Whoa, chill out!');
    });
    it('asking a question', () => {
        const result = (0, bob_1.hey)('Does this cryogenic chamber make me look fat?');
        expect(result).toEqual('Sure.');
    });
    it('asking a numeric question', () => {
        const result = (0, bob_1.hey)('You are, what, like 15?');
        expect(result).toEqual('Sure.');
    });
    it('asking gibberish', () => {
        const result = (0, bob_1.hey)('fffbbcbeab?');
        expect(result).toEqual('Sure.');
    });
    it('talking forcefully', () => {
        const result = (0, bob_1.hey)("Let's go make out behind the gym!");
        expect(result).toEqual('Whatever.');
    });
    it('using acronyms in regular speech', () => {
        const result = (0, bob_1.hey)("it's OK if you don't want to go to the DMV.");
        expect(result).toEqual('Whatever.');
    });
    it('forceful question', () => {
        const result = (0, bob_1.hey)('WHAT THE HELL WERE YOU THINKING?');
        expect(result).toEqual("Calm down, I know what I'm doing!");
    });
    it('shouting numbers', () => {
        const result = (0, bob_1.hey)('1, 2, 3 GO!');
        expect(result).toEqual('Whoa, chill out!');
    });
    it('no letters', () => {
        const result = (0, bob_1.hey)('1, 2, 3');
        expect(result).toEqual('Whatever.');
    });
    it('question with no letters', () => {
        const result = (0, bob_1.hey)('4?');
        expect(result).toEqual('Sure.');
    });
    it('shouting with special characters', () => {
        const result = (0, bob_1.hey)('ZOMG THE %^*@#$(*^ ZOMBIES ARE COMING!!11!!1!');
        expect(result).toEqual('Whoa, chill out!');
    });
    it('shouting with no exclamation mark', () => {
        const result = (0, bob_1.hey)('I HATE THE DMV');
        expect(result).toEqual('Whoa, chill out!');
    });
    it('statement containing question mark', () => {
        const result = (0, bob_1.hey)('Ending with ? means a question.');
        expect(result).toEqual('Whatever.');
    });
    it('prattling on', () => {
        const result = (0, bob_1.hey)('Wait! Hang on.  Are you going to be OK?');
        expect(result).toEqual('Sure.');
    });
    it('silence', () => {
        const result = (0, bob_1.hey)('');
        expect(result).toEqual('Fine. Be that way!');
    });
    it('prolonged silence', () => {
        const result = (0, bob_1.hey)('   ');
        expect(result).toEqual('Fine. Be that way!');
    });
    it('alternate silence', () => {
        const result = (0, bob_1.hey)('\t\t\t\t\t\t\t\t\t\t');
        expect(result).toEqual('Fine. Be that way!');
    });
    it('multiple line question', () => {
        const result = (0, bob_1.hey)('\nDoes this cryogenic chamber make me look fat?\nNo.');
        expect(result).toEqual('Whatever.');
    });
    it('starting with whitespace', () => {
        const result = (0, bob_1.hey)('         hmmmmmmm...');
        expect(result).toEqual('Whatever.');
    });
    it('ending with whitespace', () => {
        const result = (0, bob_1.hey)('Okay if like my  spacebar  quite a bit?   ');
        expect(result).toEqual('Sure.');
    });
    it('other whitespace', () => {
        const result = (0, bob_1.hey)('\n\r \t');
        expect(result).toEqual('Fine. Be that way!');
    });
    it('non-question ending with whitespace', () => {
        const result = (0, bob_1.hey)('This is a statement ending with whitespace      ');
        expect(result).toEqual('Whatever.');
    });
});
