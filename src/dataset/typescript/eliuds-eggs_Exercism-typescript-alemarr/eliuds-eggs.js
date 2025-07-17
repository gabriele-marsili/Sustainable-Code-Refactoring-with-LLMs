"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eggCount = void 0;
const eggCount = (displayValue) => {
    return displayValue
        .toString(2)
        .split("")
        .reduce((acc, eggPosition) => {
        acc += Number(eggPosition);
        return acc;
    }, 0);
};
exports.eggCount = eggCount;
