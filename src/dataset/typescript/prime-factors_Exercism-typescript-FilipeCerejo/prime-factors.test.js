"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prime_factors_1 = require("./prime-factors");
describe('calculatePrimeFactors', () => {
    it('returns an empty array for 1', () => expect((0, prime_factors_1.calculatePrimeFactors)(1)).toEqual([]));
    xit('factors 2', () => expect((0, prime_factors_1.calculatePrimeFactors)(2)).toEqual([2]));
    xit('factors 3', () => expect((0, prime_factors_1.calculatePrimeFactors)(3)).toEqual([3]));
    xit('factors 4', () => expect((0, prime_factors_1.calculatePrimeFactors)(4)).toEqual([2, 2]));
    xit('factors 6', () => expect((0, prime_factors_1.calculatePrimeFactors)(6)).toEqual([2, 3]));
    xit('factors 8', () => expect((0, prime_factors_1.calculatePrimeFactors)(8)).toEqual([2, 2, 2]));
    xit('factors 9', () => expect((0, prime_factors_1.calculatePrimeFactors)(9)).toEqual([3, 3]));
    xit('factors 27', () => expect((0, prime_factors_1.calculatePrimeFactors)(27)).toEqual([3, 3, 3]));
    xit('factors 625', () => expect((0, prime_factors_1.calculatePrimeFactors)(625)).toEqual([5, 5, 5, 5]));
    xit('factors 901255', () => expect((0, prime_factors_1.calculatePrimeFactors)(901255)).toEqual([5, 17, 23, 461]));
    xit('factors 93819012551', () => expect((0, prime_factors_1.calculatePrimeFactors)(93819012551)).toEqual([11, 9539, 894119]));
});
