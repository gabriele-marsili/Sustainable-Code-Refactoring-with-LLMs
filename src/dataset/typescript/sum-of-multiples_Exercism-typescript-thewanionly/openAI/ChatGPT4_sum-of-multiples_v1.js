"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multiples, limit) {
    const uniqueMultiples = Array.from(new Set(multiples)).filter(m => m > 0);
    let sumOfMultiples = 0;
    for (const multiple of uniqueMultiples) {
        for (let i = multiple; i < limit; i += multiple) {
            sumOfMultiples += i;
        }
    }
    return sumOfMultiples - uniqueMultiples.reduce((acc, m1, _, arr) => acc + arr.filter(m2 => m2 !== m1 && m1 % m2 === 0).reduce((a, m) => a + m, 0), 0);
}
