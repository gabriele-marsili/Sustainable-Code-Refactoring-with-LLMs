"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verse = verse;
exports.sing = sing;
const verseTemplate = `#begin# bottle#plural# of beer on the wall, #begin# bottle#plural# of beer.\nTake #oneit# down and pass it around, #end# bottle#endplural# of beer on the wall.\n`;
const lastVerse = `No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n`;
const replacements = {
    begin: /#begin#/g,
    end: /#end#/g,
    plural: /#plural#/g,
    endplural: /#endplural#/g,
    oneit: /#oneit#/g,
};
function verse(index) {
    if (index) {
        let verse = verseTemplate;
        verse = verse.replace(replacements.begin, index.toString());
        const endIndex = index - 1;
        const endString = endIndex > 0 ? endIndex.toString() : 'no more';
        verse = verse.replace(replacements.end, endString);
        const plural = index === 1 ? '' : 's';
        verse = verse.replace(replacements.plural, plural);
        const endPlural = index === 2 ? '' : 's';
        verse = verse.replace(replacements.endplural, endPlural);
        const oneIt = index === 1 ? 'it' : 'one';
        verse = verse.replace(replacements.oneit, oneIt);
        return verse;
    }
    return lastVerse;
}
function sing(initialBottlesCount, takeDownCount) {
    const begin = initialBottlesCount === undefined ? 99 : initialBottlesCount;
    const end = takeDownCount === undefined ? 0 : takeDownCount;
    if (begin <= end) {
        return "";
    }
    let result = '';
    for (let i = begin; i >= end; i--) {
        result += verse(i);
        if (i !== end) {
            result += '\n';
        }
    }
    return result;
}
