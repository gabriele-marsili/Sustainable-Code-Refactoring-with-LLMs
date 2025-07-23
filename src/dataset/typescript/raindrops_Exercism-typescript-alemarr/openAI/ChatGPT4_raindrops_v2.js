"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const dividers = [
    [3, "Pling"],
    [5, "Plang"],
    [7, "Plong"],
];
function convert(input) {
    const result = dividers
        .filter(([divider]) => input % divider === 0)
        .map(([, sound]) => sound)
        .join("");
    return result || input.toString();
}
