"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multipliers, n) {
    const multiples = new Set();
    let sum = 0;
    for (const multiplier of multipliers) {
        for (let i = multiplier; i < n; i += multiplier) {
            if (!multiples.has(i)) {
                multiples.add(i);
                sum += i;
            }
        }
    }
    return sum;
}
