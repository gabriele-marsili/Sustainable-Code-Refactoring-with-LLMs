"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const palindrome_products_1 = __importDefault(require("./palindrome-products"));
describe('Palindrome', () => {
    it('largest palindrome from single digit factors', () => {
        const palindromes = (0, palindrome_products_1.default)({ maxFactor: 9 });
        const largest = palindromes.largest;
        expect(largest.value).toEqual(9);
        const containsMatch = [[3, 3], [1, 9]].filter((el) => numericalArraysMatch(el, [3, 3])).length > 0;
        expect(containsMatch).toBe(true);
    });
    it('largest palindrome from double digit factors', () => {
        const palindromes = (0, palindrome_products_1.default)({ maxFactor: 99, minFactor: 10 });
        const largest = palindromes.largest;
        expect(largest.value).toEqual(9009);
        expect(largest.factors).toEqual([91, 99]);
    });
    it('smallest palindrome from double digit factors', () => {
        const palindromes = (0, palindrome_products_1.default)({ maxFactor: 99, minFactor: 10 });
        const smallest = palindromes.smallest;
        expect(smallest.value).toEqual(121);
        expect(smallest.factors).toEqual([11, 11]);
    });
    it('largest palindrome from triple digit factors', () => {
        const palindromes = (0, palindrome_products_1.default)({ maxFactor: 999, minFactor: 100 });
        const largest = palindromes.largest;
        expect(largest.value).toEqual(906609);
        expect(largest.factors).toEqual([913, 993]);
    });
    it('smallest palindrome from triple digit factors', () => {
        const palindromes = (0, palindrome_products_1.default)({ maxFactor: 999, minFactor: 100 });
        const smallest = palindromes.smallest;
        expect(smallest.value).toEqual(10201);
        expect(smallest.factors).toEqual([101, 101]);
    });
});
function numericalArraysMatch(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    const one = [...a].sort(numericalSort);
    const two = [...b].sort(numericalSort);
    let result = true;
    let index = 0;
    while (index < one.length) {
        result = result && one[index] === two[index];
        index++;
    }
    return result;
}
function numericalSort(x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}
