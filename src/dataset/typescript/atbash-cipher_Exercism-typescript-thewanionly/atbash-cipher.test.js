"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atbash_cipher_1 = require("./atbash-cipher");
describe('AtbashCipher', () => {
    describe('encoding', () => {
        it('encode yes', () => {
            const cipherText = (0, atbash_cipher_1.encode)('yes');
            expect(cipherText).toEqual('bvh');
        });
        it('encode no', () => {
            const cipherText = (0, atbash_cipher_1.encode)('no');
            expect(cipherText).toEqual('ml');
        });
        it('encode OMG', () => {
            const cipherText = (0, atbash_cipher_1.encode)('OMG');
            expect(cipherText).toEqual('lnt');
        });
        it('encode spaces', () => {
            const cipherText = (0, atbash_cipher_1.encode)('O M G');
            expect(cipherText).toEqual('lnt');
        });
        it('encode mindblowingly', () => {
            const cipherText = (0, atbash_cipher_1.encode)('mindblowingly');
            expect(cipherText).toEqual('nrmwy oldrm tob');
        });
        it('encode numbers', () => {
            const cipherText = (0, atbash_cipher_1.encode)('Testing,1 2 3, testing.');
            expect(cipherText).toEqual('gvhgr mt123 gvhgr mt');
        });
        it('encode deep thought', () => {
            const cipherText = (0, atbash_cipher_1.encode)('Truth is fiction.');
            expect(cipherText).toEqual('gifgs rhurx grlm');
        });
        it('encode all the letters', () => {
            const cipherText = (0, atbash_cipher_1.encode)('thequickbrownfoxjumpsoverthelazydog');
            expect(cipherText).toEqual('gsvjf rxpyi ldmul cqfnk hlevi gsvoz abwlt');
        });
    });
    describe('decode', () => {
        it('decode exercism', () => {
            const plainText = (0, atbash_cipher_1.decode)('vcvix rhn');
            expect(plainText).toEqual('exercism');
        });
        it('decode a sentence', () => {
            const cipherText = (0, atbash_cipher_1.decode)('zmlyh gzxov rhlug vmzhg vkkrm thglm v');
            expect(cipherText).toEqual('anobstacleisoftenasteppingstone');
        });
        it('decode numbers', () => {
            const plainText = (0, atbash_cipher_1.decode)('gvhgr mt123 gvhgr mt');
            expect(plainText).toEqual('testing123testing');
        });
        it('decode all the letters', () => {
            const cipherText = (0, atbash_cipher_1.decode)('gsvjf rxpyi ldmul cqfnk hlevi gsvoz abwlt');
            expect(cipherText).toEqual('thequickbrownfoxjumpsoverthelazydog');
        });
    });
});
