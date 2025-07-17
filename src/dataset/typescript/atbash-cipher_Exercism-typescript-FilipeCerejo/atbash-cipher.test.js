"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atbash_cipher_1 = require("./atbash-cipher");
describe('AtbashCipher', () => {
    describe('encoding', () => {
        it('encode yes', () => {
            const cipherText = (0, atbash_cipher_1.encode)('yes');
            expect(cipherText).toEqual('bvh');
        });
        xit('encode no', () => {
            const cipherText = (0, atbash_cipher_1.encode)('no');
            expect(cipherText).toEqual('ml');
        });
        xit('encode OMG', () => {
            const cipherText = (0, atbash_cipher_1.encode)('OMG');
            expect(cipherText).toEqual('lnt');
        });
        xit('encode spaces', () => {
            const cipherText = (0, atbash_cipher_1.encode)('O M G');
            expect(cipherText).toEqual('lnt');
        });
        xit('encode mindblowingly', () => {
            const cipherText = (0, atbash_cipher_1.encode)('mindblowingly');
            expect(cipherText).toEqual('nrmwy oldrm tob');
        });
        xit('encode numbers', () => {
            const cipherText = (0, atbash_cipher_1.encode)('Testing,1 2 3, testing.');
            expect(cipherText).toEqual('gvhgr mt123 gvhgr mt');
        });
        xit('encode deep thought', () => {
            const cipherText = (0, atbash_cipher_1.encode)('Truth is fiction.');
            expect(cipherText).toEqual('gifgs rhurx grlm');
        });
        xit('encode all the letters', () => {
            const cipherText = (0, atbash_cipher_1.encode)('thequickbrownfoxjumpsoverthelazydog');
            expect(cipherText).toEqual('gsvjf rxpyi ldmul cqfnk hlevi gsvoz abwlt');
        });
    });
    xdescribe('decode', () => {
        xit('decode exercism', () => {
            const plainText = (0, atbash_cipher_1.decode)('vcvix rhn');
            expect(plainText).toEqual('exercism');
        });
        xit('decode a sentence', () => {
            const cipherText = (0, atbash_cipher_1.decode)('zmlyh gzxov rhlug vmzhg vkkrm thglm v');
            expect(cipherText).toEqual('anobstacleisoftenasteppingstone');
        });
        xit('decode numbers', () => {
            const plainText = (0, atbash_cipher_1.decode)('gvhgr mt123 gvhgr mt');
            expect(plainText).toEqual('testing123testing');
        });
        xit('decode all the letters', () => {
            const cipherText = (0, atbash_cipher_1.decode)('gsvjf rxpyi ldmul cqfnk hlevi gsvoz abwlt');
            expect(cipherText).toEqual('thequickbrownfoxjumpsoverthelazydog');
        });
    });
});
