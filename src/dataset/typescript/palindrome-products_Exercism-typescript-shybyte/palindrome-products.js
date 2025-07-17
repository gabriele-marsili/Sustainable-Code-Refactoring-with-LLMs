"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
const isPalindrome = (n) => ([...n.toString()].reverse().join('')) === n.toString();
const getNumericKeys = (object) => Object.keys(object).map((key) => parseInt(key, 10));
function generate({ minFactor = 1, maxFactor = Number.MAX_VALUE }) {
    const factorsByProduct = {};
    for (let factor1 = minFactor; factor1 <= maxFactor; factor1++) {
        for (let factor2 = factor1; factor2 <= maxFactor; factor2++) {
            const product = factor1 * factor2;
            if (isPalindrome(product)) {
                factorsByProduct[product] = [...(factorsByProduct[product] || []), [factor1, factor2]];
            }
        }
    }
    const smallestProduct = Math.min(...getNumericKeys(factorsByProduct));
    const largestProduct = Math.max(...getNumericKeys(factorsByProduct));
    const getOutputFactors = (factors) => factors.length === 1 ? factors[0] : factors;
    return {
        smallest: {
            value: smallestProduct,
            factors: getOutputFactors(factorsByProduct[smallestProduct])
        },
        largest: {
            value: largestProduct,
            factors: getOutputFactors(factorsByProduct[largestProduct])
        }
    };
}
