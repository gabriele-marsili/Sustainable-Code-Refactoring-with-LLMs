"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = accumulate;
function accumulate(collection, accumulator) {
    const result = [];
    for (const item of collection) {
        result.push(accumulator(item));
    }
    return result;
}
