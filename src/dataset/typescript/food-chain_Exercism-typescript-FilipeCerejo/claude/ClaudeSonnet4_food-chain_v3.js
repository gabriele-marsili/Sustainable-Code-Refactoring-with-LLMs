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
const COMMON_PHRASES = {
    opening: 'I know an old lady who swallowed a ',
    spider: ' that wriggled and jiggled and tickled inside her.',
    closing: `I don't know why she swallowed the fly. Perhaps she'll die.\n`,
    death: `She's dead, of course!\n`,
    catchPrefix: 'She swallowed the ',
    catchMiddle: ' to catch the ',
};
function verse(v) {
    const animalIndex = v - 1;
    const animal = animals[animalIndex];
    const parts = [COMMON_PHRASES.opening, animal.name, '.\n'];
    if (v === animals.length) {
        parts.push(COMMON_PHRASES.death);
        return parts.join('');
    }
    if (animal.secondVerse) {
        parts.push(animal.secondVerse, '\n');
    }
    const maxIndex = Math.min(animalIndex, animals.length - 2);
    for (let i = maxIndex; i > 0; i--) {
        parts.push(COMMON_PHRASES.catchPrefix, animals[i].name, COMMON_PHRASES.catchMiddle, animals[i - 1].name, i === 1 ? COMMON_PHRASES.spider : '.', '\n');
    }
    parts.push(COMMON_PHRASES.closing);
    return parts.join('');
}
function verses(first, last) {
    const parts = [];
    for (let i = first; i <= last; i++) {
        parts.push(verse(i));
        if (i < last)
            parts.push('\n');
    }
    return parts.join('');
}
