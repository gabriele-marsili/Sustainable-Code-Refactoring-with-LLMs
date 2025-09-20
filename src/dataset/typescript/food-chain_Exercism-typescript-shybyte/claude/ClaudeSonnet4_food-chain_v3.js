"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FOOD_CHAIN = [
    { animal: 'fly', sentence: "I don't know why she swallowed the fly. Perhaps she'll die.", optionalDescription: '' },
    { animal: 'spider', sentence: 'It wriggled and jiggled and tickled inside her.', optionalDescription: ' that wriggled and jiggled and tickled inside her' },
    { animal: 'bird', sentence: 'How absurd to swallow a bird!', optionalDescription: '' },
    { animal: 'cat', sentence: 'Imagine that, to swallow a cat!', optionalDescription: '' },
    { animal: 'dog', sentence: 'What a hog, to swallow a dog!', optionalDescription: '' },
    { animal: 'goat', sentence: 'Just opened her throat and swallowed a goat!', optionalDescription: '' },
    { animal: 'cow', sentence: "I don't know how she swallowed a cow!", optionalDescription: '' },
    { animal: 'horse', sentence: "She's dead, of course!", optionalDescription: '' }
];
const FIRST_LINE_PREFIX = 'I know an old lady who swallowed a ';
const SWALLOW_PREFIX = 'She swallowed the ';
const CATCH_INFIX = ' to catch the ';
function verse(verseNumber) {
    if (verseNumber === 8) {
        const { animal, sentence } = FOOD_CHAIN[7];
        return `${FIRST_LINE_PREFIX}${animal}.\n${sentence}\n`;
    }
    let result = `${FIRST_LINE_PREFIX}${FOOD_CHAIN[verseNumber - 1].animal}.\n${FOOD_CHAIN[verseNumber - 1].sentence}\n`;
    for (let i = verseNumber - 2; i >= 0; i--) {
        const current = FOOD_CHAIN[i];
        const previous = FOOD_CHAIN[i + 1];
        result += `${SWALLOW_PREFIX}${previous.animal}${CATCH_INFIX}${current.animal}${current.optionalDescription}.\n`;
    }
    if (verseNumber > 1) {
        result += `${FOOD_CHAIN[0].sentence}\n`;
    }
    return result;
}
function verses(minVerse = 1, maxVerse = 8) {
    let result = '';
    for (let i = minVerse; i <= maxVerse; i++) {
        result += verse(i);
        if (i < maxVerse)
            result += '\n';
    }
    return result;
}
exports.default = { verse, verses };
