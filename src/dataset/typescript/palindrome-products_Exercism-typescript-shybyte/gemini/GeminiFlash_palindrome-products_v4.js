"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
const isPalindrome = (n) => {
    const s = n.toString();
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};
function generate({ minFactor = 1, maxFactor = Number.MAX_VALUE }) {
    let smallestProduct = Number.MAX_VALUE;
    let largestProduct = 0;
    const factorsByProduct = {};
    for (let factor1 = minFactor; factor1 <= maxFactor; factor1++) {
        for (let factor2 = factor1; factor2 <= maxFactor; factor2++) {
            const product = factor1 * factor2;
            if (isPalindrome(product)) {
                factorsByProduct[product] = factorsByProduct[product] ? [...factorsByProduct[product], [factor1, factor2]] : [[factor1, factor2]];
                if (product < smallestProduct) {
                    smallestProduct = product;
                }
                if (product > largestProduct) {
                    largestProduct = product;
                }
            }
        }
    }
    const getOutputFactors = (factors) => factors.length === 1 ? factors[0] : factors;
    return {
        smallest: {
            value: smallestProduct === Number.MAX_VALUE ? null : smallestProduct,
            factors: smallestProduct === Number.MAX_VALUE ? [] : getOutputFactors(factorsByProduct[smallestProduct])
        },
        largest: {
            value: largestProduct === 0 ? null : largestProduct,
            factors: largestProduct === 0 ? [] : getOutputFactors(factorsByProduct[largestProduct])
        }
    };
}
