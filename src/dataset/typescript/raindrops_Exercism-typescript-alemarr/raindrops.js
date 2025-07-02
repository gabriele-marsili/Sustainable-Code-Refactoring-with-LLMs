"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
var soundsMap = new Map([
    [3, "Pling"],
    [5, "Plang"],
    [7, "Plong"],
]);
function convert(input) {
    var converted = "";
    soundsMap.forEach(function (sound, divider) {
        if (input % divider === 0) {
            converted += sound;
        }
    });
    if (converted.length === 0) {
        return input.toString();
    }
    return converted;
}
