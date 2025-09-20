"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
function transform(old) {
    const transformed = {};
    for (const [value, letters] of Object.entries(old)) {
        for (const letter of letters) {
            transformed[letter.toLowerCase()] = +value;
        }
    }
    return transformed;
}
