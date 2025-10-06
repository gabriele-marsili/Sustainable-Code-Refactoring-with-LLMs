"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = accumulate;
function accumulate(collection, accumulator) {
    return collection.map(accumulator);
}
