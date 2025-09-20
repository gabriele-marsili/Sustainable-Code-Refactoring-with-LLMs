"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedValue = void 0;
const colorsMap = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9,
};
const decodedValue = (colors) => colorsMap[colors[0]] * 10 + colorsMap[colors[1]];
exports.decodedValue = decodedValue;
