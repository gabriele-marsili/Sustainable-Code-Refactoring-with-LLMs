"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prime_factors_1 = __importDefault(require("./prime-factors"));
describe('calculatePrimeFactors', () => {
    it('returns an empty array for 1', () => expect((0, prime_factors_1.default)(1)).toEqual([]));
    it('factors 2', () => expect((0, prime_factors_1.default)(2)).toEqual([2]));
    it('factors 3', () => expect((0, prime_factors_1.default)(3)).toEqual([3]));
    it('factors 4', () => expect((0, prime_factors_1.default)(4)).toEqual([2, 2]));
    it('factors 6', () => expect((0, prime_factors_1.default)(6)).toEqual([2, 3]));
    it('factors 8', () => expect((0, prime_factors_1.default)(8)).toEqual([2, 2, 2]));
    it('factors 9', () => expect((0, prime_factors_1.default)(9)).toEqual([3, 3]));
    it('factors 27', () => expect((0, prime_factors_1.default)(27)).toEqual([3, 3, 3]));
    it('factors 625', () => expect((0, prime_factors_1.default)(625)).toEqual([5, 5, 5, 5]));
    it('factors 901255', () => expect((0, prime_factors_1.default)(901255)).toEqual([5, 17, 23, 461]));
    it('factors 93819012551', () => expect((0, prime_factors_1.default)(93819012551)).toEqual([11, 9539, 894119]));
});
