"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eggCount = void 0;
const eggCount = (displayValue) => {
    let count = 0;
    let value = displayValue;
    while (value > 0) {
        count += value & 1;
        value >>>= 1;
    }
    return count;
};
exports.eggCount = eggCount;
