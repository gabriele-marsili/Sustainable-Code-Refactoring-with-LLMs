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
const colorMap = new Map(exports.COLORS.map((color, index) => [color, index]));
const colorCode = (color) => {
    return colorMap.get(color);
};
exports.colorCode = colorCode;
