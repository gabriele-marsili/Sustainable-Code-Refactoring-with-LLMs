"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verse = verse;
exports.sing = sing;
const verseTemplate = `#begin# bottle#plural# of beer on the wall, #begin# bottle#plural# of beer.
Take #oneit# down and pass it around, #end# bottle#endplural# of beer on the wall.\n`;
const lastVerse = `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.\n`;
const replacements = {
    begin: /#begin#/g,
    end: /#end#/g,
    plural: /#plural#/g,
    endplural: /#endplural#/g,
    oneit: /#oneit#/g,
};
function verse(index) {
    if (index > 0) {
        const prevIndex = index - 1;
        const prevIndexStr = prevIndex > 0 ? prevIndex.toString() : 'no more';
        const isOne = index === 1;
        const isTwo = index === 2;
        let verseText = verseTemplate.replace(replacements.begin, index.toString());
        verseText = verseText.replace(replacements.end, prevIndexStr);
        verseText = verseText.replace(replacements.plural, isOne ? '' : 's');
        verseText = verseText.replace(replacements.endplural, isTwo ? '' : 's');
        verseText = verseText.replace(replacements.oneit, isOne ? 'it' : 'one');
        return verseText;
    }
    return lastVerse;
}
function sing(initialBottlesCount = 99, takeDownCount = 0) {
    const begin = initialBottlesCount;
    const end = takeDownCount;
    const result = [];
    for (let i = begin; i >= begin - end; i--) {
        result.push(verse(i));
    }
    return result.join('\n');
}
