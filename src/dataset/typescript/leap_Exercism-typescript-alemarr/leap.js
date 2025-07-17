"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLeap = void 0;
const isLeap = (year) => {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
};
exports.isLeap = isLeap;
