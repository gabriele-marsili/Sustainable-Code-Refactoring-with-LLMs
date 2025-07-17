"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
function sum(multipliers, n) {
    let multiples = new Set();
    let sum = 0;
    multipliers.forEach((multiplier) => {
        for (let i = multiplier, factor = 1; i && i < n; i = multiplier * ++factor) {
            multiples.add(i);
        }
    });
    let values = multiples.values();
    for (let i = values.next(); !i.done; i = values.next()) {
        sum += i.value;
    }
    return sum;
}
