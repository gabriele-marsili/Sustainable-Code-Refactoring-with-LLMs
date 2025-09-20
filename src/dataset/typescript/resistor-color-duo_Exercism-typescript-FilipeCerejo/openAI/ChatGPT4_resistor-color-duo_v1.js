"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedValue = decodedValue;
const ColorValues = [
    'black', 'brown', 'red', 'orange', 'yellow',
    'green', 'blue', 'violet', 'grey', 'white'
];
function decodedValue(colors) {
    return ColorValues.indexOf(colors[0]) * 10 + ColorValues.indexOf(colors[1]);
}
