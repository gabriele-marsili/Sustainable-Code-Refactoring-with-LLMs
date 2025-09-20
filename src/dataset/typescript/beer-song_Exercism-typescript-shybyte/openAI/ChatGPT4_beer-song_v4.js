"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verse = verse;
exports.sing = sing;
const verseTemplate = '#BEGIN# bottle#PLURAL# of beer on the wall, #BEGIN# bottle#PLURAL# of beer.\n' +
    'Take #ONEIT# down and pass it around, #END# bottle#ENDPLURAL# of beer on the wall.\n';
const lastVerse = 'No more bottles of beer on the wall, no more bottles of beer.\n' +
    'Go to the store and buy some more, 99 bottles of beer on the wall.\n';
function verse(index) {
    if (index === 0)
        return lastVerse;
    const beginStr = index.toString();
    const endIndex = index - 1;
    const endStr = endIndex === 0 ? 'no more' : endIndex.toString();
    const plural = index === 1 ? '' : 's';
    const endPlural = index === 2 ? '' : 's';
    const oneIt = index === 1 ? 'it' : 'one';
    return verseTemplate
        .replace(/#BEGIN#/g, beginStr)
        .replace(/#END#/g, endStr)
        .replace(/#PLURAL#/g, plural)
        .replace(/#ENDPLURAL#/g, endPlural)
        .replace(/#ONEIT#/g, oneIt);
}
function sing(initialBottlesCount, takeDownCount) {
    const begin = initialBottlesCount !== null && initialBottlesCount !== void 0 ? initialBottlesCount : 99;
    const end = takeDownCount !== null && takeDownCount !== void 0 ? takeDownCount : 0;
    let result = '';
    for (let i = begin; i >= end; i--) {
        result += verse(i) + (i > end ? '\n' : '');
    }
    return result;
}
