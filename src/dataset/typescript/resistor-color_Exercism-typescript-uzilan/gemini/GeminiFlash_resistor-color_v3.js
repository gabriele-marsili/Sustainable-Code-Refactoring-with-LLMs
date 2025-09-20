"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorCode = exports.COLORS = void 0;
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
exports.COLORS = Array.from(COLOR_MAP.keys());
const colorCode = (color) => {
    const code = COLOR_MAP.get(color);
    return code !== undefined ? code : -1;
};
exports.colorCode = colorCode;
