"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multiples, limit) {
    if (multiples.length === 0 || limit <= 1)
        return 0;
    const validMultiples = multiples.filter(m => m > 0 && m < limit);
    if (validMultiples.length === 0)
        return 0;
    const seen = new Set();
    for (const multiple of validMultiples) {
        for (let i = multiple; i < limit; i += multiple) {
            seen.add(i);
        }
    }
    return Array.from(seen).reduce((sum, num) => sum + num, 0);
}
