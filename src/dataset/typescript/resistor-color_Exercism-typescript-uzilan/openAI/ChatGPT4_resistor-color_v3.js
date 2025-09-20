"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorCode = exports.COLORS = void 0;
exports.COLORS = Object.freeze([
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
]);
const COLOR_MAP = Object.freeze(exports.COLORS.reduce((map, color, index) => {
    map[color] = index;
    return map;
}, {}));
const colorCode = (color) => { var _a; return (_a = COLOR_MAP[color]) !== null && _a !== void 0 ? _a : -1; };
exports.colorCode = colorCode;
