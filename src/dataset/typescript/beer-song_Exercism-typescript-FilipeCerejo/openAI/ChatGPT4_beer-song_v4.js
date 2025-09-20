"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bottles(n) {
    if (n === 0)
        return 'no more bottles';
    if (n === 1)
        return '1 bottle';
    return `${n} bottles`;
}
function action(n) {
    return n === 0
        ? 'Go to the store and buy some more'
        : n === 1
            ? 'Take it down and pass it around'
            : 'Take one down and pass it around';
}
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
function verse(beerNumber) {
    const nextNumber = beerNumber === 0 ? 99 : beerNumber - 1;
    return `${capitalize(bottles(beerNumber))} of beer on the wall, ${bottles(beerNumber)} of beer.\n` +
        `${action(beerNumber)}, ${bottles(nextNumber)} of beer on the wall.\n`;
}
function sing(beerMax = 99, beerMin = 0) {
    let result = '';
    for (let i = beerMax; i >= beerMin; i--) {
        result += verse(i) + (i > beerMin ? '\n' : '');
    }
    return result;
}
exports.default = { verse, sing };
