"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLORS = exports.colorCode = void 0;
const COLORS_MAP = {
    black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
    green: 5, blue: 6, violet: 7, grey: 8, white: 9
};
const colorCode = (code) => {
    var _a;
    return (_a = COLORS_MAP[code]) !== null && _a !== void 0 ? _a : -1;
};
exports.colorCode = colorCode;
exports.COLORS = Object.keys(COLORS_MAP);
