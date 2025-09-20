"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
function transform(old) {
    const transformed = {};
    for (const value in old) {
        const numValue = Number(value);
        const letters = old[value];
        for (let i = 0; i < letters.length; i++) {
            transformed[letters[i].toLowerCase()] = numValue;
        }
    }
    return transformed;
}
