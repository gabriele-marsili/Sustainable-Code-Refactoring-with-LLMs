"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedResistorValue = decodedResistorValue;
var ResistorColorValues;
(function (ResistorColorValues) {
    ResistorColorValues[ResistorColorValues["black"] = 0] = "black";
    ResistorColorValues[ResistorColorValues["brown"] = 1] = "brown";
    ResistorColorValues[ResistorColorValues["red"] = 2] = "red";
    ResistorColorValues[ResistorColorValues["orange"] = 3] = "orange";
    ResistorColorValues[ResistorColorValues["yellow"] = 4] = "yellow";
    ResistorColorValues[ResistorColorValues["green"] = 5] = "green";
    ResistorColorValues[ResistorColorValues["blue"] = 6] = "blue";
    ResistorColorValues[ResistorColorValues["violet"] = 7] = "violet";
    ResistorColorValues[ResistorColorValues["grey"] = 8] = "grey";
    ResistorColorValues[ResistorColorValues["white"] = 9] = "white";
})(ResistorColorValues || (ResistorColorValues = {}));
const colorValues = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9
};
function decodedResistorValue([firstBand, secondBand, thirdBand]) {
    const firstDigit = colorValues[firstBand];
    const secondDigit = colorValues[secondBand];
    const multiplier = colorValues[thirdBand];
    let ohms = (firstDigit * 10 + secondDigit) * Math.pow(10, multiplier);
    if (ohms >= 1000) {
        ohms /= 1000;
        return `${ohms} kiloohms`;
    }
    return `${ohms} ohms`;
}
