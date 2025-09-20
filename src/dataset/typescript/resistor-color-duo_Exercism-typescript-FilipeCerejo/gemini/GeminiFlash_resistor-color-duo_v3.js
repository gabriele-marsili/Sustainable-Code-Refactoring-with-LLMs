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
const colorValueLookup = new Map(Object.entries(ColorValues));
function decodedValue(colors) {
    const [firstColor, secondColor] = colors;
    const firstValue = colorValueLookup.get(firstColor);
    const secondValue = colorValueLookup.get(secondColor);
    return firstValue * 10 + secondValue;
}
