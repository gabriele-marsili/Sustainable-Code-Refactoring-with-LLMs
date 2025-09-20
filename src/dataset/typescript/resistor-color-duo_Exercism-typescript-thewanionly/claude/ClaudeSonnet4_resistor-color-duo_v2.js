"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedValue = decodedValue;
const RESISTOR_COLOR_VALUES = {
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
    return RESISTOR_COLOR_VALUES[firstBand] * 10 + RESISTOR_COLOR_VALUES[secondBand];
}
