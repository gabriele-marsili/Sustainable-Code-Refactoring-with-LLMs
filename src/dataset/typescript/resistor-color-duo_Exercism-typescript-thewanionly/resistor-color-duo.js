"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedValue = decodedValue;
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
function decodedValue([firstBand, secondBand]) {
    return ResistorColorValues[firstBand] * 10 + ResistorColorValues[secondBand];
}
