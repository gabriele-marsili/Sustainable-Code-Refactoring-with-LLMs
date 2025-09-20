"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multiples, limit) {
    const uniqueMultiples = [...new Set(multiples.filter(m => m > 0))].sort((a, b) => a - b);
    let sumOfMultiples = 0;
    const seen = new Set();
    for (const multiple of uniqueMultiples) {
        for (let i = multiple; i < limit; i += multiple) {
            if (!seen.has(i)) {
                sumOfMultiples += i;
                seen.add(i);
            }
        }
    }
    return sumOfMultiples;
}
