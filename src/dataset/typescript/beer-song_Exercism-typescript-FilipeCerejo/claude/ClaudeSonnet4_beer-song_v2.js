"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verse = verse;
exports.sing = sing;
const verseTemplate = `#begin# bottle#plural# of beer on the wall, #begin# bottle#plural# of beer.
Take #oneit# down and pass it around, #end# bottle#endplural# of beer on the wall.\n`;
const lastVerse = `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.\n`;
function verse(index) {
    if (index === 0) {
        return lastVerse;
    }
    const begin = index.toString();
    const end = index === 1 ? 'no more' : (index - 1).toString();
    const plural = index === 1 ? '' : 's';
    const endplural = index === 2 ? '' : 's';
    const oneit = index === 1 ? 'it' : 'one';
    return `${begin} bottle${plural} of beer on the wall, ${begin} bottle${plural} of beer.
Take ${oneit} down and pass it around, ${end} bottle${endplural} of beer on the wall.\n`;
}
function sing(initialBottlesCount = 99, takeDownCount = 0) {
    const verses = [];
    for (let i = initialBottlesCount; i >= takeDownCount; i--) {
        verses.push(verse(i));
    }
    return verses.join('\n');
}
