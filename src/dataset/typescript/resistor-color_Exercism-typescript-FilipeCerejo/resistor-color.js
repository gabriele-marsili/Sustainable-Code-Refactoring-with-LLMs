"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLORS = exports.colorCode = void 0;
const colorCode = (code) => {
    return exports.COLORS.indexOf(code);
};
exports.colorCode = colorCode;
exports.COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
