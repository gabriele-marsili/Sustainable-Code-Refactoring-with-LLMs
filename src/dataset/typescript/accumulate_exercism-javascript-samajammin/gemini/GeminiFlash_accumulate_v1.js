"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = accumulate;
function accumulate(collection, accumulator) {
    const result = new Array(collection.length);
    for (let i = 0; i < collection.length; i++) {
        result[i] = accumulator(collection[i]);
    }
    return result;
}
