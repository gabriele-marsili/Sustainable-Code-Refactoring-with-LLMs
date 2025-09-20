"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedValue = void 0;
const colorsMap = [
    'black', 'brown', 'red', 'orange', 'yellow',
    'green', 'blue', 'violet', 'grey', 'white'
];
const decodedValue = (colors) => colorsMap.indexOf(colors[0]) * 10 + colorsMap.indexOf(colors[1]);
exports.decodedValue = decodedValue;
