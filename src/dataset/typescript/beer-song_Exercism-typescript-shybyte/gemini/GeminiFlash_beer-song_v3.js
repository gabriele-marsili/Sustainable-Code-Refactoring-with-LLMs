"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bottles(n) {
    if (n === 0) {
        return 'no more bottles';
    }
    return n === 1 ? '1 bottle' : n + ' bottles';
}
function action(n) {
    if (n === 0) {
        return 'Go to the store and buy some more';
    }
    return 'Take ' + (n === 1 ? 'it' : 'one') + ' down and pass it around';
}
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
function verse(beerNumber) {
    const bottlesCurrent = bottles(beerNumber);
    const situation = capitalize(`${bottlesCurrent} of beer on the wall, ${bottlesCurrent} of beer.\n`);
    const nextNumber = beerNumber === 0 ? 99 : beerNumber - 1;
    return situation + action(beerNumber) + `, ${bottles(nextNumber)} of beer on the wall.\n`;
}
function sing(beerMax = 99, beerMin = 0) {
    let result = '';
    for (let i = beerMax; i >= beerMin; i--) {
        result += verse(i);
        if (i !== beerMin) {
            result += '\n';
        }
    }
    return result;
}
exports.default = { verse, sing };
