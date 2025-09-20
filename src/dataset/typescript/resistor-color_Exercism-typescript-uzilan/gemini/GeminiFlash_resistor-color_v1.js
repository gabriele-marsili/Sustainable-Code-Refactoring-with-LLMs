"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorCode = exports.COLORS = void 0;
const COLORS_MAP = {
    'black': 0,
    'brown': 1,
    'red': 2,
    'orange': 3,
    'yellow': 4,
    'green': 5,
    'blue': 6,
    'violet': 7,
    'grey': 8,
    'white': 9,
};
exports.COLORS = Object.keys(COLORS_MAP);
const colorCode = (color) => {
    var _a;
    return (_a = COLORS_MAP[color]) !== null && _a !== void 0 ? _a : -1;
};
exports.colorCode = colorCode;
