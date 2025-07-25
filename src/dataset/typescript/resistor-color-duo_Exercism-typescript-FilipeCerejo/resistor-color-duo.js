"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedValue = decodedValue;
const ColorValues = {
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
function decodedValue(colors) {
    return Number(`${ColorValues[colors[0]]}${ColorValues[colors[1]]}`);
}
