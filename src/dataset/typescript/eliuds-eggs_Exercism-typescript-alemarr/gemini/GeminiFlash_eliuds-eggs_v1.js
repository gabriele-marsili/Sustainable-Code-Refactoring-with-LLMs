"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eggCount = void 0;
const eggCount = (displayValue) => {
    let count = 0;
    while (displayValue > 0) {
        count += displayValue % 2;
        displayValue = Math.floor(displayValue / 2);
    }
    return count;
};
exports.eggCount = eggCount;
