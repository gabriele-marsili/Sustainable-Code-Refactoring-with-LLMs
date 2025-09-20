"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedValue = decodedValue;
const colorValues = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9
};
function decodedValue([firstBand, secondBand]) {
    return colorValues[firstBand] * 10 + colorValues[secondBand];
}
