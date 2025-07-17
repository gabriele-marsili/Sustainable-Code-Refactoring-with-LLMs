"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (lettersByScore) => {
    const result = {};
    Object.entries(lettersByScore).forEach(([score, letters]) => {
        for (const letter of letters) {
            result[letter.toLowerCase()] = Number(score);
        }
    });
    return result;
};
