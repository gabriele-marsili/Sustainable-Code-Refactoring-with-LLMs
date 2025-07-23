"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const convertMap = {
    3: "Pling",
    5: "Plang",
    7: "Plong",
};
function convert(input) {
    let result = "";
    if (input % 3 === 0)
        result += convertMap[3];
    if (input % 5 === 0)
        result += convertMap[5];
    if (input % 7 === 0)
        result += convertMap[7];
    return result || input.toString();
}
