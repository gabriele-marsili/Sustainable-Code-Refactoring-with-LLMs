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
    const smallestFactors = [];
    const largestFactors = [];
    for (let factor1 = minFactor; factor1 <= maxFactor; factor1++) {
        for (let factor2 = factor1; factor2 <= maxFactor; factor2++) {
            const product = factor1 * factor2;
            if (isPalindrome(product)) {
                if (product < smallestProduct) {
                    smallestProduct = product;
                    smallestFactors.length = 0; // Clear existing factors
                    smallestFactors.push([factor1, factor2]);
                }
                else if (product === smallestProduct) {
                    smallestFactors.push([factor1, factor2]);
                }
                if (product > largestProduct) {
                    largestProduct = product;
                    largestFactors.length = 0; // Clear existing factors
                    largestFactors.push([factor1, factor2]);
                }
                else if (product === largestProduct) {
                    largestFactors.push([factor1, factor2]);
                }
            }
        }
    }
    const getOutputFactors = (factors) => factors.length === 1 ? factors[0] : factors;
    return {
        smallest: {
            value: smallestProduct === Number.MAX_VALUE ? null : smallestProduct,
            factors: smallestProduct === Number.MAX_VALUE ? [] : getOutputFactors(smallestFactors)
        },
        largest: {
            value: largestProduct === 0 ? null : largestProduct,
            factors: largestProduct === 0 ? [] : getOutputFactors(largestFactors)
        }
    };
}
