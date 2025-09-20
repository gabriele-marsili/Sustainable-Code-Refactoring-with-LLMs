"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorCode = exports.COLORS = void 0;
exports.COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
const COLOR_MAP = new Map(exports.COLORS.map((color, index) => [color, index]));
const colorCode = (code) => {
    var _a;
    return (_a = COLOR_MAP.get(code)) !== null && _a !== void 0 ? _a : -1;
};
exports.colorCode = colorCode;
