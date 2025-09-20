"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorCode = exports.COLORS = void 0;
exports.COLORS = [
    'black',
    'brown',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'grey',
    'white',
];
const COLOR_MAP = new Map([
    ['black', 0],
    ['brown', 1],
    ['red', 2],
    ['orange', 3],
    ['yellow', 4],
    ['green', 5],
    ['blue', 6],
    ['violet', 7],
    ['grey', 8],
    ['white', 9],
]);
const colorCode = (color) => {
    return COLOR_MAP.get(color);
};
exports.colorCode = colorCode;
