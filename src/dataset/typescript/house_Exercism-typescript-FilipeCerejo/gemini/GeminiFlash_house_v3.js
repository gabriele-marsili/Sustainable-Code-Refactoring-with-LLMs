"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verse = verse;
exports.verses = verses;
const start = 'This is';
const end = ' the house that Jack built.';
const rhymes = [
    ['the malt', 'that lay in'],
    ['the rat', 'that ate'],
    ['the cat', 'that killed'],
    ['the dog', 'that worried'],
    ['the cow with the crumpled horn', 'that tossed'],
    ['the maiden all forlorn', 'that milked'],
    ['the man all tattered and torn', 'that kissed'],
    ['the priest all shaven and shorn', 'that married'],
    ['the rooster that crowed in the morn', 'that woke'],
    ['the farmer sowing his corn', 'that kept'],
    ['the horse and the hound and the horn', 'that belonged to'],
];
function verse(v) {
    const result = [start];
    let currentLine = start;
    for (let i = v - 1; i >= 1; i--) {
        currentLine += ` ${rhymes[i - 1][0]}`;
        result[0] = currentLine;
        result.push(`${rhymes[i - 1][1]}`);
    }
    result[0] = currentLine + end;
    return result;
}
function verses(startVerse, endVerse) {
    const result = [];
    for (let i = startVerse; i <= endVerse; i++) {
        const verseResult = verse(i);
        result.push(...verseResult);
        if (i < endVerse) {
            result.push('');
        }
    }
    return result;
}
