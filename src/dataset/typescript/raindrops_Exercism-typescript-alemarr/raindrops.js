"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const soundsMap = new Map([
    [3, "Pling"],
    [5, "Plang"],
    [7, "Plong"],
]);
function convert(input) {
    let converted = "";
    soundsMap.forEach((sound, divider) => {
        if (input % divider === 0) {
            converted += sound;
        }
    });
    if (converted.length === 0) {
        return input.toString();
    }
    return converted;
}
