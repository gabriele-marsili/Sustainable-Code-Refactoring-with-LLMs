"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const sounds = [
    [3, "Pling"],
    [5, "Plang"],
    [7, "Plong"],
];
function convert(input) {
    let converted = "";
    for (const [divider, sound] of sounds) {
        if (input % divider === 0) {
            converted += sound;
        }
    }
    return converted || input.toString();
}
