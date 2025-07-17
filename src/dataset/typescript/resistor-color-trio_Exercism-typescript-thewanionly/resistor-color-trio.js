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
function decodedResistorValue([firstBand, secondBand, thirdBand]) {
    return `${(ResistorColorValues[firstBand] * 10 + ResistorColorValues[secondBand]) *
        Math.pow(10, ResistorColorValues[thirdBand])} ohms`.replace('000 ', ' kilo');
}
