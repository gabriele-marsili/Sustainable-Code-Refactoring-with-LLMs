"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const SOUNDS = [
    [3, "Pling"],
    [5, "Plang"],
    [7, "Plong"],
];
function convert(input) {
    let result = "";
    for (const [divider, sound] of SOUNDS) {
        if (input % divider === 0) {
            result += sound;
        }
    }
    return result || input.toString();
}
