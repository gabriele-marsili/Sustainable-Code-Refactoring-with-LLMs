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
const POWERS_OF_10 = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];
function decodedResistorValue(colors) {
    const baseValue = CV[colors[0]] * 10 + CV[colors[1]];
    const rawResistorValue = baseValue * POWERS_OF_10[CV[colors[2]]];
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
