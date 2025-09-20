"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verse = verse;
exports.verses = verses;
const animals = [
    { name: 'fly' },
    { name: 'spider', secondVerse: 'It wriggled and jiggled and tickled inside her.' },
    { name: 'bird', secondVerse: 'How absurd to swallow a bird!' },
    { name: 'cat', secondVerse: 'Imagine that, to swallow a cat!' },
    { name: 'dog', secondVerse: 'What a hog, to swallow a dog!' },
    { name: 'goat', secondVerse: 'Just opened her throat and swallowed a goat!' },
    { name: 'cow', secondVerse: `I don't know how she swallowed a cow!` },
    { name: 'horse', secondVerse: `She's dead, of course!` },
];
function verse(v) {
    const lines = [`I know an old lady who swallowed a ${animals[v - 1].name}.`];
    if (v === animals.length) {
        lines.push(`She's dead, of course!`);
    }
    else {
        if (animals[v - 1].secondVerse)
            lines.push(animals[v - 1].secondVerse);
        for (let i = v - 1; i > 0; i--) {
            lines.push(`She swallowed the ${animals[i].name} to catch the ${animals[i - 1].name}${i - 1 === 1 ? ' that wriggled and jiggled and tickled inside her.' : '.'}`);
        }
        lines.push(`I don't know why she swallowed the fly. Perhaps she'll die.`);
    }
    return lines.join('\n') + '\n';
}
function verses(first, last) {
    return Array.from({ length: last - first + 1 }, (_, i) => verse(first + i)).join('\n');
}
