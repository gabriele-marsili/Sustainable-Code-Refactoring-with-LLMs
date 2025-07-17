"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIsogram = isIsogram;
function isIsogram(phrase) {
    let letter_map = (phrase.match(/\w/g) || [])
        .map((w) => w.toLowerCase())
        .reduce((acc, cur) => {
        if (acc[cur]) {
            acc[cur]++;
        }
        else {
            acc[cur] = 1;
        }
        return acc;
    }, {});
    return Object.keys(letter_map).every((k) => letter_map[k] === 1);
}
