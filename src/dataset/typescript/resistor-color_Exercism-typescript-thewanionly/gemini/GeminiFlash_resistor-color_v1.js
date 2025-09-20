"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLORS = exports.colorCode = void 0;
const ResistorColorValues = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9
};
const colorCode = (color) => {
    return ResistorColorValues[color];
};
exports.colorCode = colorCode;
exports.COLORS = Object.freeze(Object.keys(ResistorColorValues));
