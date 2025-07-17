"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verse = verse;
exports.sing = sing;
const verseTemplate = `#begin# bottle#plural# of beer on the wall, #begin# bottle#plural# of beer.
Take #oneit# down and pass it around, #end# bottle#endplural# of beer on the wall.\n`;
const lastVerse = `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.\n`;
function verse(index) {
    if (index) {
        return verseTemplate
            .replace(/#begin#/g, index.toString())
            .replace(/#end#/g, index - 1 ? (index - 1).toString() : 'no more')
            .replace(/#plural#/g, index === 1 ? '' : 's')
            .replace(/#endplural#/g, index === 2 ? '' : 's')
            .replace(/#oneit#/g, index === 1 ? 'it' : 'one');
    }
    return lastVerse;
}
function sing(initialBottlesCount, takeDownCount) {
    let begin = initialBottlesCount ? initialBottlesCount : 99;
    let end = takeDownCount ? takeDownCount : 0;
    return [...Array(begin - end + 1).keys()]
        .map((val) => {
        return verse(begin - val);
    })
        .join('\n');
}
