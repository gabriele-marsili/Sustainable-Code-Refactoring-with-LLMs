"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
function convert(input) {
    let converted = "";
    if (input % 3 === 0)
        converted += "Pling";
    if (input % 5 === 0)
        converted += "Plang";
    if (input % 7 === 0)
        converted += "Plong";
    return converted || input.toString();
}
