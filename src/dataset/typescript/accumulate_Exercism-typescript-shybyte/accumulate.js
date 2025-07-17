"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function accumulate(array, accumulator) {
    const result = [];
    for (const el of array) {
        result.push(accumulator(el));
    }
    return result;
}
exports.default = accumulate;
