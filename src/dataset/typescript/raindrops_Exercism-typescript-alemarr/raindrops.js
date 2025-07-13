"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const dividers = [
    [3, "Pling"],
    [5, "Plang"],
    [7, "Plong"],
];
function convert(input) {
    let result = "";
    for (let i = 0; i < dividers.length; i++) {
        const [divider, sound] = dividers[i];
        if (input % divider === 0) {
            result += sound;
        }
    }
}
