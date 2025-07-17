"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_length_encoding_1 = require("./run-length-encoding");
describe('run-length encode a string', () => {
    it('empty string', () => {
        const expected = '';
        expect((0, run_length_encoding_1.encode)('')).toEqual(expected);
    });
    it('single characters only are encoded without count', () => {
        const expected = 'XYZ';
        expect((0, run_length_encoding_1.encode)('XYZ')).toEqual(expected);
    });
    it('string with no single characters', () => {
        const expected = '2A3B4C';
        expect((0, run_length_encoding_1.encode)('AABBBCCCC')).toEqual(expected);
    });
    it('single characters mixed with repeated characters', () => {
        const expected = '12WB12W3B24WB';
        expect((0, run_length_encoding_1.encode)('WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB')).toEqual(expected);
    });
    it('multiple whitespace mixed in string', () => {
        const expected = '2 hs2q q2w2 ';
        expect((0, run_length_encoding_1.encode)('  hsqq qww  ')).toEqual(expected);
    });
    it('lowercase characters', () => {
        const expected = '2a3b4c';
        expect((0, run_length_encoding_1.encode)('aabbbcccc')).toEqual(expected);
    });
});
describe('run-length decode a string', () => {
    it('empty string', () => {
        const expected = '';
        expect((0, run_length_encoding_1.decode)('')).toEqual(expected);
    });
    it('single characters only', () => {
        const expected = 'XYZ';
        expect((0, run_length_encoding_1.decode)('XYZ')).toEqual(expected);
    });
    it('string with no single characters', () => {
        const expected = 'AABBBCCCC';
        expect((0, run_length_encoding_1.decode)('2A3B4C')).toEqual(expected);
    });
    it('single characters with repeated characters', () => {
        const expected = 'WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB';
        expect((0, run_length_encoding_1.decode)('12WB12W3B24WB')).toEqual(expected);
    });
    it('multiple whitespace mixed in string', () => {
        const expected = '  hsqq qww  ';
        expect((0, run_length_encoding_1.decode)('2 hs2q q2w2 ')).toEqual(expected);
    });
    it('lower case string', () => {
        const expected = 'aabbbcccc';
        expect((0, run_length_encoding_1.decode)('2a3b4c')).toEqual(expected);
    });
});
describe('encode and then decode', () => {
    it('encode followed by decode gives original string', () => {
        expect((0, run_length_encoding_1.decode)((0, run_length_encoding_1.encode)('zzz ZZ  zZ'))).toEqual('zzz ZZ  zZ');
    });
});
