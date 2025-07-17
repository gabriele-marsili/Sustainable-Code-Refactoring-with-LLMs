"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accumulate_1 = __importDefault(require("./accumulate"));
describe('accumulate()', () => {
    it('accumulation empty', () => {
        const accumulator = (e) => e * e;
        expect((0, accumulate_1.default)([], accumulator)).toEqual([]);
    });
    it('accumulate squares', () => {
        const accumulator = (n) => n * n;
        const result = (0, accumulate_1.default)([1, 2, 3], accumulator);
        expect(result).toEqual([1, 4, 9]);
    });
    it('accumulate upcases', () => {
        const accumulator = (word) => word.toUpperCase();
        const result = (0, accumulate_1.default)('hello world'.split(/\s/), accumulator);
        expect(result).toEqual(['HELLO', 'WORLD']);
    });
    it('accumulate reversed strings', () => {
        const accumulator = (word) => word
            .split('')
            .reverse()
            .join('');
        const result = (0, accumulate_1.default)('the quick brown fox etc'.split(/\s/), accumulator);
        expect(result).toEqual(['eht', 'kciuq', 'nworb', 'xof', 'cte']);
    });
    it('accumulate recursively', () => {
        const result = (0, accumulate_1.default)('a b c'.split(/\s/), (char) => (0, accumulate_1.default)('1 2 3'.split(/\s/), (digit) => char + digit));
        expect(result).toEqual([
            ['a1', 'a2', 'a3'],
            ['b1', 'b2', 'b3'],
            ['c1', 'c2', 'c3']
        ]);
    });
});
