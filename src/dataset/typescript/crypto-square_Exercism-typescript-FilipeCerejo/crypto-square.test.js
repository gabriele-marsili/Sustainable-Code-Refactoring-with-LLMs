"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_square_1 = require("./crypto-square");
describe('Crypto', () => {
    it('empty plaintext results in an empty ciphertext', () => {
        const crypto = new crypto_square_1.Crypto('');
        expect(crypto.ciphertext).toEqual('');
    });
    it('Lowercase', () => {
        const crypto = new crypto_square_1.Crypto('A');
        expect(crypto.ciphertext).toEqual('a');
    });
    it('Remove spaces', () => {
        const crypto = new crypto_square_1.Crypto('  b ');
        expect(crypto.ciphertext).toEqual('b');
    });
    it('Remove punctuation', () => {
        const crypto = new crypto_square_1.Crypto('@1,%!');
        expect(crypto.ciphertext).toEqual('1');
    });
    xit('9 character plaintext results in 3 chunks of 3 characters', () => {
        const crypto = new crypto_square_1.Crypto('This is fun!');
        expect(crypto.ciphertext).toEqual('tsf hiu isn');
    });
    xit('8 character plaintext results in 3 chunks, the last one with a trailing space', () => {
        const crypto = new crypto_square_1.Crypto('Chill out.');
        expect(crypto.ciphertext).toEqual('clu hlt io ');
    });
    it.skip('54 character plaintext results in 7 chunks, the last two with trailing spaces', () => {
        const crypto = new crypto_square_1.Crypto('If man was meant to stay on the ground, god would have given us roots.');
        expect(crypto.ciphertext).toEqual('imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn  sseoau ');
    });
});
