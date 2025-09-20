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
    return sumOfMultiples - uniqueMultiples.reduce((acc, m1, _, arr) => acc + arr.reduce((subAcc, m2) => m1 !== m2 && m1 % m2 === 0 ? subAcc + m1 : subAcc, 0), 0);
}
