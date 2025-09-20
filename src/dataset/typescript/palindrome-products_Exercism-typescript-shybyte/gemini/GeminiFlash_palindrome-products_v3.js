"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
const isPalindrome = (n) => {
    const s = n.toString();
    const len = s.length;
    for (let i = 0; i < Math.floor(len / 2); i++) {
        if (s[i] !== s[len - 1 - i]) {
            return false;
        }
    }
    return true;
};
const getNumericKeys = (object) => {
    const keys = [];
    for (const key in object) {
        if (Object.hasOwn(object, key)) {
            keys.push(Number(key));
        }
    }
    return keys;
};
function generate({ minFactor = 1, maxFactor = Number.MAX_VALUE }) {
    const factorsByProduct = {};
    let smallestProduct = Number.MAX_VALUE;
    let largestProduct = 0;
    for (let factor1 = minFactor; factor1 <= maxFactor; factor1++) {
        for (let factor2 = factor1; factor2 <= maxFactor; factor2++) {
            const product = factor1 * factor2;
            if (isPalindrome(product)) {
                if (!factorsByProduct[product]) {
                    factorsByProduct[product] = [];
                }
                factorsByProduct[product].push([factor1, factor2]);
                smallestProduct = Math.min(smallestProduct, product);
                largestProduct = Math.max(largestProduct, product);
            }
        }
    }
    const getOutputFactors = (factors) => factors.length === 1 ? factors[0] : factors;
    return {
        smallest: {
            value: smallestProduct === Number.MAX_VALUE ? null : smallestProduct,
            factors: smallestProduct === Number.MAX_VALUE ? null : getOutputFactors(factorsByProduct[smallestProduct])
        },
        largest: {
            value: largestProduct === 0 ? null : largestProduct,
            factors: largestProduct === 0 ? null : getOutputFactors(factorsByProduct[largestProduct])
        }
    };
}
