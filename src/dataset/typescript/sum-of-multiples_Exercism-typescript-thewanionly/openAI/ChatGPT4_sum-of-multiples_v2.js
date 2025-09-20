"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multiples, limit) {
    const uniqueMultiples = Array.from(new Set(multiples)).filter(m => m > 0);
    let sumOfMultiples = 0;
    for (let i = 0; i < uniqueMultiples.length; i++) {
        const multiple = uniqueMultiples[i];
        for (let j = multiple; j < limit; j += multiple) {
            sumOfMultiples += j;
        }
    }
    return sumOfMultiples - uniqueMultiples.reduce((acc, m1, i) => acc + uniqueMultiples.slice(i + 1).reduce((acc2, m2) => acc2 + acc2 + acc2));
}
