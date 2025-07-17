"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
function transform(oldScoring) {
    let newScoring = {};
    Object.entries(oldScoring).forEach(([score, letters]) => {
        letters.forEach((letter) => {
            newScoring[letter.toLowerCase()] = Number(score);
        });
    });
    return newScoring;
}
