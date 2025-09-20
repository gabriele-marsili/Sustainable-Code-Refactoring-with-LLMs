"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multipliers, n) {
    if (n <= 1 || multipliers.length === 0)
        return 0;
    const multiples = new Set();
    for (const multiplier of multipliers) {
        if (multiplier <= 0 || multiplier >= n)
            continue;
        for (let i = multiplier; i < n; i += multiplier) {
            multiples.add(i);
        }
    }
    let sum = 0;
    for (const value of multiples) {
        sum += value;
    }
    return sum;
}
