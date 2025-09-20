"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verse = verse;
exports.verses = verses;
const animals = [
    {
        name: 'fly',
    },
    {
        name: 'spider',
        secondVerse: 'It wriggled and jiggled and tickled inside her.',
    },
    {
        name: 'bird',
        secondVerse: 'How absurd to swallow a bird!',
    },
    {
        name: 'cat',
        secondVerse: 'Imagine that, to swallow a cat!',
    },
    {
        name: 'dog',
        secondVerse: 'What a hog, to swallow a dog!',
    },
    {
        name: 'goat',
        secondVerse: 'Just opened her throat and swallowed a goat!',
    },
    {
        name: 'cow',
        secondVerse: `I don't know how she swallowed a cow!`,
    },
    {
        name: 'horse',
        secondVerse: `She's dead, of course!`,
    },
];
const flyVerse = `I don't know why she swallowed the fly. Perhaps she'll die.\n`;
function verse(v) {
    const animal = animals[v - 1];
    let verseText = `I know an old lady who swallowed a ${animal.name}.\n`;
    if (v === animals.length) {
        verseText += `She's dead, of course!\n`;
    }
    else {
        if (animal.secondVerse) {
            verseText += `${animal.secondVerse}\n`;
        }
        for (let i = Math.min(v - 1, animals.length - 2); i > 0; i--) {
            const currentAnimal = animals[i];
            const previousAnimal = animals[i - 1];
            verseText += `She swallowed the ${currentAnimal.name} to catch the ${previousAnimal.name}${i === 2 ? ' that wriggled and jiggled and tickled inside her.' : '.'}\n`;
        }
        verseText += flyVerse;
    }
    return verseText;
}
function verses(first, last) {
    let versesText = '';
    for (let i = first; i <= last; i++) {
        versesText += verse(i);
        if (i !== last) {
            versesText += '\n';
        }
    }
    return versesText;
}
