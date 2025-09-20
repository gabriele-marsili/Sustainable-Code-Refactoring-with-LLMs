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
const ResistanceMultipliers = [
    1,
    10,
    100,
    1000,
    10000,
    100000,
    1000000,
    10000000,
    100000000,
    1000000000
];
function decodedResistorValue([firstBand, secondBand, thirdBand]) {
    const firstDigit = ResistorColorValues[firstBand];
    const secondDigit = ResistorColorValues[secondBand];
    const multiplier = ResistanceMultipliers[ResistorColorValues[thirdBand]];
    let resistance = (firstDigit * 10 + secondDigit) * multiplier;
    if (resistance >= 1000) {
        resistance /= 1000;
        return `${resistance} kiloohms`;
    }
    else {
        return `${resistance} ohms`;
    }
}
