"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = accumulate;
function accumulate(collection, accumulator) {
    const length = collection.length;
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = accumulator(collection[i]);
    }
    return result;
}
