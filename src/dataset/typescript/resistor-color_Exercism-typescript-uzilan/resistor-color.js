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
const colorCode = (color) => {
    return exports.COLORS.indexOf(color);
};
exports.colorCode = colorCode;
