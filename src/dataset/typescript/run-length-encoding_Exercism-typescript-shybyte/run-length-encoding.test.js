"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const run_length_encoding_1 = __importDefault(require("./run-length-encoding"));
describe('run-length encode a string', () => {
    it('empty string', () => {
        const expected = '';
        expect(run_length_encoding_1.default.encode('')).toEqual(expected);
    });
    it('single characters only are encoded without count', () => {
        const expected = 'XYZ';
        expect(run_length_encoding_1.default.encode('XYZ')).toEqual(expected);
    });
    it('string with no single characters', () => {
        const expected = '2A3B4C';
        expect(run_length_encoding_1.default.encode('AABBBCCCC')).toEqual(expected);
    });
    it('single characters mixed with repeated characters', () => {
        const expected = '12WB12W3B24WB';
        expect(run_length_encoding_1.default.encode('WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB')).toEqual(expected);
    });
    it('multiple whitespace mixed in string', () => {
        const expected = '2 hs2q q2w2 ';
        expect(run_length_encoding_1.default.encode('  hsqq qww  ')).toEqual(expected);
    });
    it('lowercase characters', () => {
        const expected = '2a3b4c';
        expect(run_length_encoding_1.default.encode('aabbbcccc')).toEqual(expected);
    });
});
describe('run-length decode a string', () => {
    it('empty string', () => {
        const expected = '';
        expect(run_length_encoding_1.default.decode('')).toEqual(expected);
    });
    it('single characters only', () => {
        const expected = 'XYZ';
        expect(run_length_encoding_1.default.decode('XYZ')).toEqual(expected);
    });
    it('string with no single characters', () => {
        const expected = 'AABBBCCCC';
        expect(run_length_encoding_1.default.decode('2A3B4C')).toEqual(expected);
    });
    it('single characters with repeated characters', () => {
        const expected = 'WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB';
        expect(run_length_encoding_1.default.decode('12WB12W3B24WB')).toEqual(expected);
    });
    it('multiple whitespace mixed in string', () => {
        const expected = '  hsqq qww  ';
        expect(run_length_encoding_1.default.decode('2 hs2q q2w2 ')).toEqual(expected);
    });
    it('lower case string', () => {
        const expected = 'aabbbcccc';
        expect(run_length_encoding_1.default.decode('2a3b4c')).toEqual(expected);
    });
});
describe('encode and then decode', () => {
    it('encode followed by decode gives original string', () => {
        expect(run_length_encoding_1.default.decode(run_length_encoding_1.default.encode('zzz ZZ  zZ'))).toEqual('zzz ZZ  zZ');
    });
});
