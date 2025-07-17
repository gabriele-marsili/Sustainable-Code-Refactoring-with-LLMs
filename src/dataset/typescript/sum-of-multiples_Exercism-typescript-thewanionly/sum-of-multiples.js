"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multiples, limit) {
    let sumOfMultiples = 0;
    for (let i = 1; i < limit; i++) {
        if (multiples.some((multiple) => i % multiple === 0)) {
            sumOfMultiples += i;
        }
    }
    return sumOfMultiples;
}
