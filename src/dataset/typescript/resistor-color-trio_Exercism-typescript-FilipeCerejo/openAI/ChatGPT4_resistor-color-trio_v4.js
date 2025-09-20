"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedResistorValue = decodedResistorValue;
const CV = {
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
function decodedResistorValue(colors) {
    const [first, second, third] = colors;
    const rawResistorValue = (CV[first] * 10 + CV[second]) * Math.pow(10, CV[third]);
    if (rawResistorValue >= 1000000) {
        return `${rawResistorValue / 1000000} megaohms`;
    }
    else if (rawResistorValue >= 1000) {
        return `${rawResistorValue / 1000} kiloohms`;
    }
    else {
        return `${rawResistorValue} ohms`;
    }
}
