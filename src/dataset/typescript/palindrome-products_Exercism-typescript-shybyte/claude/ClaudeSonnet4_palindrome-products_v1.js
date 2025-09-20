"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
const isPalindrome = (n) => {
    const str = n.toString();
    const len = str.length;
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i])
            return false;
    }
    return true;
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
                if (product < smallestProduct)
                    smallestProduct = product;
                if (product > largestProduct)
                    largestProduct = product;
            }
        }
    }
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
