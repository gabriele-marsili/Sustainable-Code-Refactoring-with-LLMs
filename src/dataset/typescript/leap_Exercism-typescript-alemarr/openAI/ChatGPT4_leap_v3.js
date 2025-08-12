"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLeap = void 0;
const isLeap = (year) => !(year & 3) && (year % 25 !== 0 || year % 16 === 0);
exports.isLeap = isLeap;
