"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
function transform(old) {
    const transformed = {};
    for (const value in old) {
        if (Object.hasOwn(old, value)) {
            const letters = old[value];
            const numericValue = Number(value);
            for (let i = 0; i < letters.length; i++) {
                const letter = letters[i].toLowerCase();
                transformed[letter] = numericValue;
            }
        }
    }
    return transformed;
}
