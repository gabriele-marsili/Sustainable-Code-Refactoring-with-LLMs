"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const dividers = [
    [3, "Pling"],
    [5, "Plang"],
    [7, "Plong"],
];
function convert(input) {
    if (input % 3 !== 0 && input % 5 !== 0 && input % 7 !== 0) {
        return input.toString();
    }
    let result = "";
    if (input % 3 === 0)
        result += "Pling";
    if (input % 5 === 0)
        result += "Plang";
    if (input % 7 === 0)
        result += "Plong";
    return result;
}
