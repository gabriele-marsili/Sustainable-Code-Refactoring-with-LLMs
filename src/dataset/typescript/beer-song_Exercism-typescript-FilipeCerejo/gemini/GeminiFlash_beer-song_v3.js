"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verse = verse;
exports.sing = sing;
const verseTemplate = `#begin# bottle#plural# of beer on the wall, #begin# bottle#plural# of beer.
Take #oneit# down and pass it around, #end# bottle#endplural# of beer on the wall.\n`;
const lastVerse = `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.\n`;
const replacements = [
    { pattern: /#begin#/g },
    { pattern: /#end#/g },
    { pattern: /#plural#/g },
    { pattern: /#endplural#/g },
    { pattern: /#oneit#/g },
];
function verse(index) {
    if (index) {
        let result = verseTemplate;
        const nextIndex = index - 1;
        const nextIndexStr = nextIndex > 0 ? nextIndex.toString() : 'no more';
        result = result.replace(replacements[0].pattern, index.toString());
        result = result.replace(replacements[1].pattern, nextIndexStr);
        result = result.replace(replacements[2].pattern, index === 1 ? '' : 's');
        result = result.replace(replacements[3].pattern, index === 2 ? '' : 's');
        result = result.replace(replacements[4].pattern, index === 1 ? 'it' : 'one');
        return result;
    }
    return lastVerse;
}
function sing(initialBottlesCount = 99, takeDownCount = 0) {
    const begin = initialBottlesCount;
    const end = takeDownCount;
    const result = [];
    for (let i = begin; i >= end; i--) {
        result.push(verse(i));
    }
    return result.join('\n');
}
