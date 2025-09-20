"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedResistorValue = decodedResistorValue;
const RESISTOR_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const COLOR_MAP = {
    black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
    green: 5, blue: 6, violet: 7, grey: 8, white: 9
};
function decodedResistorValue([firstBand, secondBand, thirdBand]) {
    const value = (COLOR_MAP[firstBand] * 10 + COLOR_MAP[secondBand]) * (Math.pow(10, COLOR_MAP[thirdBand]));
    return value >= 1000 && value % 1000 === 0
        ? `${value / 1000} kilohms`
        : `${value} ohms`;
}
