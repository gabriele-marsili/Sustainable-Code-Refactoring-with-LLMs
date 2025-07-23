"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const dividers = [
    [3, "Pling"],
    [5, "Plang"],
    [7, "Plong"],
];
function convert(input) {
    const result = dividers.reduce((acc, [divider, sound]) => input % divider === 0 ? acc + sound : acc, "");
    return result || input.toString();
}
