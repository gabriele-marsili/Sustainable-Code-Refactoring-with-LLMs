"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verse = verse;
exports.sing = sing;
const verseTemplate = `#begin# bottle#plural# of beer on the wall, #begin# bottle#plural# of beer.
Take #oneit# down and pass it around, #end# bottle#endplural# of beer on the wall.\n`;
const lastVerse = `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.\n`;
const replacementCache = new Map();
function verse(index) {
    if (!index) {
        return lastVerse;
    }
    if (replacementCache.has(index)) {
        return replacementCache.get(index);
    }
    const beginStr = index.toString();
    const endStr = index === 1 ? 'no more' : (index - 1).toString();
    const plural = index === 1 ? '' : 's';
    const endPlural = index === 2 ? '' : 's';
    const oneIt = index === 1 ? 'it' : 'one';
    const result = `${beginStr} bottle${plural} of beer on the wall, ${beginStr} bottle${plural} of beer.
Take ${oneIt} down and pass it around, ${endStr} bottle${endPlural} of beer on the wall.\n`;
    replacementCache.set(index, result);
    return result;
}
function sing(initialBottlesCount, takeDownCount) {
    const begin = initialBottlesCount !== null && initialBottlesCount !== void 0 ? initialBottlesCount : 99;
    const end = takeDownCount !== null && takeDownCount !== void 0 ? takeDownCount : 0;
    const verses = [];
    for (let i = begin; i >= end; i--) {
        verses.push(verse(i));
    }
    return verses.join('\n');
}
