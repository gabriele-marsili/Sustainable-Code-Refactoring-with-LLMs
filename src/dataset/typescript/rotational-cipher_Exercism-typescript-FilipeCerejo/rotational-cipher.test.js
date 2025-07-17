"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rotational_cipher_1 = require("./rotational-cipher");
describe('RotationalCipher', () => {
    it('rotate a by 1', () => {
        const result = (0, rotational_cipher_1.rotate)('a', 1);
        expect(result).toEqual('b');
    });
    xit('rotate a by 26, same output as input', () => {
        const result = (0, rotational_cipher_1.rotate)('a', 26);
        expect(result).toEqual('a');
    });
    xit('rotate a by 0, same output as input', () => {
        const result = (0, rotational_cipher_1.rotate)('a', 0);
        expect(result).toEqual('a');
    });
    xit('rotate m by 13', () => {
        const result = (0, rotational_cipher_1.rotate)('m', 13);
        expect(result).toEqual('z');
    });
    xit('rotate n by 13 with wrap around alphabet', () => {
        const result = (0, rotational_cipher_1.rotate)('n', 13);
        expect(result).toEqual('a');
    });
    xit('rotate capital letters', () => {
        const result = (0, rotational_cipher_1.rotate)('OMG', 5);
        expect(result).toEqual('TRL');
    });
    xit('rotate spaces', () => {
        const result = (0, rotational_cipher_1.rotate)('O M G', 5);
        expect(result).toEqual('T R L');
    });
    xit('rotate numbers', () => {
        const result = (0, rotational_cipher_1.rotate)('Testing 1 2 3 testing', 4);
        expect(result).toEqual('Xiwxmrk 1 2 3 xiwxmrk');
    });
    xit('rotate punctuation', () => {
        const result = (0, rotational_cipher_1.rotate)("Let's eat, Grandma!", 21);
        expect(result).toEqual("Gzo'n zvo, Bmviyhv!");
    });
    xit('rotate all letters', () => {
        const result = (0, rotational_cipher_1.rotate)('The quick brown fox jumps over the lazy dog.', 13);
        expect(result).toEqual('Gur dhvpx oebja sbk whzcf bire gur ynml qbt.');
    });
});
