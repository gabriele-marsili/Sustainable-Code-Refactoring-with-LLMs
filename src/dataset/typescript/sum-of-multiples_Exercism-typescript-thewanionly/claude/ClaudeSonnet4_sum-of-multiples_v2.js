"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multiples, limit) {
    if (multiples.length === 0 || limit <= 1)
        return 0;
    const uniqueMultiples = [...new Set(multiples.filter(m => m > 0 && m < limit))];
    if (uniqueMultiples.length === 0)
        return 0;
    const found = new Set();
    for (const multiple of uniqueMultiples) {
        for (let i = multiple; i < limit; i += multiple) {
            found.add(i);
        }
    }
    return Array.from(found).reduce((sum, num) => sum + num, 0);
}
