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
const food = (animal, sentence, optionalDescription = '') => ({
    animal, sentence, optionalDescription
});
function firstLineInVerse(animal) {
    return `I know an old lady who swallowed a ${animal}.`;
}
function verse(verseNumber) {
    if (verseNumber === 8) {
        const { animal, sentence } = FOOD_CHAIN[7];
        return `${firstLineInVerse(animal)}\n${sentence}\n`;
    }
    const lines = [];
    const foodChainPart = FOOD_CHAIN.slice(0, verseNumber);
    lines.push(firstLineInVerse(foodChainPart[verseNumber - 1].animal));
    lines.push(foodChainPart[verseNumber - 1].sentence);
    for (let i = verseNumber - 2; i >= 0; i--) {
        const current = foodChainPart[i];
        const previous = foodChainPart[i + 1];
        lines.push(`She swallowed the ${previous.animal} to catch the ${current.animal}${current.optionalDescription}.`);
    }
    if (verseNumber > 1) {
        lines.push(FOOD_CHAIN[0].sentence);
    }
    return lines.join('\n') + '\n';
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
