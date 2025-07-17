"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
function transform(old) {
    let transformed = {};
    Object.keys(old).forEach((value) => {
        old[value].forEach((letter) => {
            transformed[letter.toLowerCase()] = Number(value);
        });
    });
    return transformed;
}
