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
const colorEntries = Object.entries(ResistorColorValues);
const colorMap = new Map(colorEntries);
const colorCode = (color) => {
    return colorMap.get(color);
};
exports.colorCode = colorCode;
exports.COLORS = Object.freeze(Object.keys(ResistorColorValues));
