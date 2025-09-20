"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eggCount = void 0;
const eggCount = (displayValue) => {
    let count = 0;
    let num = displayValue;
    while (num > 0) {
        count += num & 1;
        num >>>= 1;
    }
    return count;
};
exports.eggCount = eggCount;
