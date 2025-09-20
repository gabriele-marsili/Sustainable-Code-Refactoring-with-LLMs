"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FOOD_CHAIN_DATA = [
    { animal: 'fly', sentence: "I don't know why she swallowed the fly. Perhaps she'll die." },
    { animal: 'spider', sentence: 'It wriggled and jiggled and tickled inside her.', description: ' that wriggled and jiggled and tickled inside her' },
    { animal: 'bird', sentence: 'How absurd to swallow a bird!' },
    { animal: 'cat', sentence: 'Imagine that, to swallow a cat!' },
    { animal: 'dog', sentence: 'What a hog, to swallow a dog!' },
    { animal: 'goat', sentence: 'Just opened her throat and swallowed a goat!' },
    { animal: 'cow', sentence: "I don't know how she swallowed a cow!" },
    { animal: 'horse', sentence: "She's dead, of course!" }
];
function firstLineInVerse(animal) {
    return `I know an old lady who swallowed a ${animal}.`;
}
function verse(verseNumber) {
    if (verseNumber < 1 || verseNumber > 8) {
        return "";
    }
    const lines = [];
    if (verseNumber === 8) {
        const { animal, sentence } = FOOD_CHAIN_DATA[7];
        lines.push(firstLineInVerse(animal));
        lines.push(sentence);
    }
    else {
        for (let i = verseNumber - 1; i >= 0; i--) {
            const current = FOOD_CHAIN_DATA[verseNumber - 1 - i];
            if (i === verseNumber - 1) {
                lines.push(firstLineInVerse(current.animal));
            }
            else {
                const previous = FOOD_CHAIN_DATA[verseNumber - i - 2];
                lines.push(`She swallowed the ${previous.animal} to catch the ${current.animal}${current.description || ''}.`);
            }
            if (i === verseNumber - 1 || i === 0) {
                lines.push(current.sentence);
            }
        }
    }
    return lines.join('\n') + '\n';
}
function verses(minVerse = 1, maxVerse = 8) {
    let result = '';
    for (let i = minVerse; i <= maxVerse; i++) {
        result += verse(i);
        if (i < maxVerse) {
            result += '\n';
        }
    }
    return result;
}
exports.default = { verse, verses };
