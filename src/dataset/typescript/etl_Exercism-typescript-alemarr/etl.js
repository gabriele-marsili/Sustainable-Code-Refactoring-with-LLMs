"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
function transform(input) {
    const transformed = {};
    Object.entries(input).forEach(([key, value]) => value.forEach((letter) => (transformed[letter.toLowerCase()] = Number(key))));
    return transformed;
}
