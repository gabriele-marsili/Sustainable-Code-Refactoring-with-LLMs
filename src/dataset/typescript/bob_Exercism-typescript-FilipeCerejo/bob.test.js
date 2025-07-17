"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bob_1 = require("./bob");
describe('Bob', () => {
    it('stating something', () => {
        const result = (0, bob_1.hey)('Tom-ay-to, tom-aaaah-to.');
        expect(result).toEqual('Whatever.');
    });
    xit('shouting', () => {
        const result = (0, bob_1.hey)('WATCH OUT!');
        expect(result).toEqual('Whoa, chill out!');
    });
    xit('shouting gibberish', () => {
        const result = (0, bob_1.hey)('FCECDFCAAB');
        expect(result).toEqual('Whoa, chill out!');
    });
    xit('asking a question', () => {
        const result = (0, bob_1.hey)('Does this cryogenic chamber make me look fat?');
        expect(result).toEqual('Sure.');
    });
    xit('asking a numeric question', () => {
        const result = (0, bob_1.hey)('You are, what, like 15?');
        expect(result).toEqual('Sure.');
    });
    xit('asking gibberish', () => {
        const result = (0, bob_1.hey)('fffbbcbeab?');
        expect(result).toEqual('Sure.');
    });
    xit('talking forcefully', () => {
        const result = (0, bob_1.hey)("Let's go make out behind the gym!");
        expect(result).toEqual('Whatever.');
    });
    xit('using acronyms in regular speech', () => {
        const result = (0, bob_1.hey)("It's OK if you don't want to go to the DMV.");
        expect(result).toEqual('Whatever.');
    });
    xit('forceful question', () => {
        const result = (0, bob_1.hey)('WHAT THE HELL WERE YOU THINKING?');
        expect(result).toEqual("Calm down, I know what I'm doing!");
    });
    xit('shouting numbers', () => {
        const result = (0, bob_1.hey)('1, 2, 3 GO!');
        expect(result).toEqual('Whoa, chill out!');
    });
    xit('no letters', () => {
        const result = (0, bob_1.hey)('1, 2, 3');
        expect(result).toEqual('Whatever.');
    });
    xit('question with no letters', () => {
        const result = (0, bob_1.hey)('4?');
        expect(result).toEqual('Sure.');
    });
    xit('shouting with special characters', () => {
        const result = (0, bob_1.hey)('ZOMG THE %^*@#$(*^ ZOMBIES ARE COMING!!11!!1!');
        expect(result).toEqual('Whoa, chill out!');
    });
    xit('shouting with no exclamation mark', () => {
        const result = (0, bob_1.hey)('I HATE THE DMV');
        expect(result).toEqual('Whoa, chill out!');
    });
    xit('statement containing question mark', () => {
        const result = (0, bob_1.hey)('Ending with ? means a question.');
        expect(result).toEqual('Whatever.');
    });
    xit('prattling on', () => {
        const result = (0, bob_1.hey)('Wait! Hang on.  Are you going to be OK?');
        expect(result).toEqual('Sure.');
    });
    xit('silence', () => {
        const result = (0, bob_1.hey)('');
        expect(result).toEqual('Fine. Be that way!');
    });
    xit('prolonged silence', () => {
        const result = (0, bob_1.hey)('   ');
        expect(result).toEqual('Fine. Be that way!');
    });
    xit('alternate silence', () => {
        const result = (0, bob_1.hey)('\t\t\t\t\t\t\t\t\t\t');
        expect(result).toEqual('Fine. Be that way!');
    });
    xit('multiple line question', () => {
        const result = (0, bob_1.hey)('\nDoes this cryogenic chamber make me look fat?\nNo.');
        expect(result).toEqual('Whatever.');
    });
    xit('starting with whitespace', () => {
        const result = (0, bob_1.hey)('         hmmmmmmm...');
        expect(result).toEqual('Whatever.');
    });
    xit('ending with whitespace', () => {
        const result = (0, bob_1.hey)('Okay if like my  spacebar  quite a bit?   ');
        expect(result).toEqual('Sure.');
    });
    xit('other whitespace', () => {
        const result = (0, bob_1.hey)('\n\r \t');
        expect(result).toEqual('Fine. Be that way!');
    });
    xit('non-question ending with whitespace', () => {
        const result = (0, bob_1.hey)('This is a statement ending with whitespace      ');
        expect(result).toEqual('Whatever.');
    });
});
