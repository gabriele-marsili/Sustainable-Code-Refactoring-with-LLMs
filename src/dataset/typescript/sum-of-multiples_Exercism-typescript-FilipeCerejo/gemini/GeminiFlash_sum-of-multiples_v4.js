"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multipliers, n) {
    const multiples = new Set();
    let sum = 0;
    for (const multiplier of multipliers) {
        if (multiplier >= n)
            continue;
        for (let i = multiplier; i < n; i += multiplier) {
            multiples.add(i);
        }
    }
    for (const multiple of multiples) {
        sum += multiple;
    }
    return sum;
}
