"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BOTTLE_STRINGS = ['no more bottles', '1 bottle'];
const ACTION_STRINGS = [
    'Go to the store and buy some more',
    'Take it down and pass it around',
    'Take one down and pass it around'
];
function bottles(n) {
    return n <= 1 ? BOTTLE_STRINGS[n] : `${n} bottles`;
}
function action(n) {
    return ACTION_STRINGS[n <= 1 ? n : 2];
}
function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}
function verse(beerNumber) {
    const bottleText = bottles(beerNumber);
    const situation = capitalize(`${bottleText} of beer on the wall, ${bottleText} of beer.\n`);
    const nextNumber = beerNumber === 0 ? 99 : beerNumber - 1;
    return situation + action(beerNumber) + `, ${bottles(nextNumber)} of beer on the wall.\n`;
}
function sing(beerMax = 99, beerMin = 0) {
    let result = '';
    for (let i = beerMax; i >= beerMin; i--) {
        if (result)
            result += '\n';
        result += verse(i);
    }
    return result;
}
exports.default = { verse, sing };
