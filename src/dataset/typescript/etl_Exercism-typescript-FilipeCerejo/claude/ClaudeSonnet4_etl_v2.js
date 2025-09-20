"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
function transform(old) {
    const transformed = {};
    for (const key in old) {
        const numValue = Number(key);
        const letters = old[key];
        for (let i = 0; i < letters.length; i++) {
            transformed[letters[i].toLowerCase()] = numValue;
        }
    }
    return transformed;
}
