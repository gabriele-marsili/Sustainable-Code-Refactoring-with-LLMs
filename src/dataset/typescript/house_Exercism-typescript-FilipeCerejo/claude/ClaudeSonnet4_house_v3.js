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
    if (v <= 1)
        return [start + end];
    const result = new Array(v);
    result[0] = start + ` ${rhymes[v - 2][0]}`;
    for (let i = 1; i < v - 1; i++) {
        result[i] = rhymes[v - i - 2][1] + ` ${rhymes[v - i - 2][0]}`;
    }
    result[v - 1] = rhymes[0][1] + end;
    return result;
}
function verses(startVerse, endVerse) {
    const totalLines = (endVerse - startVerse + 1) * (startVerse + endVerse) / 2 + (endVerse - startVerse);
    const result = new Array(totalLines);
    let index = 0;
    for (let i = startVerse; i <= endVerse; i++) {
        const verseLines = verse(i);
        for (let j = 0; j < verseLines.length; j++) {
            result[index++] = verseLines[j];
        }
        if (i < endVerse)
            result[index++] = '';
    }
    return result;
}
