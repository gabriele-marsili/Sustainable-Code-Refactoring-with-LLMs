"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
function transform(old) {
    const transformed = {};
    for (const [key, letters] of Object.entries(old)) {
        const value = Number(key);
        for (const letter of letters) {
            transformed[letter.toLowerCase()] = value;
        }
    }
    return transformed;
}
