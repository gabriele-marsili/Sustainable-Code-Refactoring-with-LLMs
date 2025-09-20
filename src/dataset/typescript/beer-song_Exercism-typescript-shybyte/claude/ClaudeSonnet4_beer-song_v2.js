"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bottles(n) {
    if (n === 0)
        return 'no more bottles';
    if (n === 1)
        return '1 bottle';
    return n + ' bottles';
}
function action(n) {
    if (n === 0)
        return 'Go to the store and buy some more';
    return n === 1 ? 'Take it down and pass it around' : 'Take one down and pass it around';
}
function verse(beerNumber) {
    const bottlesText = bottles(beerNumber);
    const nextNumber = beerNumber === 0 ? 99 : beerNumber - 1;
    const firstChar = bottlesText[0].toUpperCase();
    const restOfString = bottlesText.slice(1);
    return `${firstChar}${restOfString} of beer on the wall, ${bottlesText} of beer.\n${action(beerNumber)}, ${bottles(nextNumber)} of beer on the wall.\n`;
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
