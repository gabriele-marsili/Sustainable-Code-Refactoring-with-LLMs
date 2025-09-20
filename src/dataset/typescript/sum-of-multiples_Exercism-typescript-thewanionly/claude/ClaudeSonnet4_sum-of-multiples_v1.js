"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multiples, limit) {
    if (multiples.length === 0 || limit <= 1) {
        return 0;
    }
    const validMultiples = multiples.filter(m => m > 0 && m < limit);
    if (validMultiples.length === 0) {
        return 0;
    }
    const seen = new Set();
    let sumOfMultiples = 0;
    for (const multiple of validMultiples) {
        for (let i = multiple; i < limit; i += multiple) {
            if (!seen.has(i)) {
                seen.add(i);
                sumOfMultiples += i;
            }
        }
    }
    return sumOfMultiples;
}
