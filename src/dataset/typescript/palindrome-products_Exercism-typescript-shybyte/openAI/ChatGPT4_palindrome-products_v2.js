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
    let smallestProduct = Number.MAX_VALUE;
    let largestProduct = Number.MIN_VALUE;
    const smallestFactors = [];
    const largestFactors = [];
    for (let factor1 = minFactor; factor1 <= maxFactor; factor1++) {
        for (let factor2 = factor1; factor2 <= maxFactor; factor2++) {
            const product = factor1 * factor2;
            if (isPalindrome(product)) {
                if (product < smallestProduct) {
                    smallestProduct = product;
                    smallestFactors.length = 0;
                    smallestFactors.push([factor1, factor2]);
                }
                else if (product === smallestProduct) {
                    smallestFactors.push([factor1, factor2]);
                }
                if (product > largestProduct) {
                    largestProduct = product;
                    largestFactors.length = 0;
                    largestFactors.push([factor1, factor2]);
                }
                else if (product === largestProduct) {
                    largestFactors.push([factor1, factor2]);
                }
            }
        }
    }
    return {
        smallest: {
            value: smallestProduct,
            factors: smallestFactors.length === 1 ? smallestFactors[0] : smallestFactors,
        },
        largest: {
            value: largestProduct,
            factors: largestFactors.length === 1 ? largestFactors[0] : largestFactors,
        },
    };
}
