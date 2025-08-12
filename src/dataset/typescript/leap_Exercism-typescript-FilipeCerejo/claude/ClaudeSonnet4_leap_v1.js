"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLeap = isLeap;
function isLeap(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}
