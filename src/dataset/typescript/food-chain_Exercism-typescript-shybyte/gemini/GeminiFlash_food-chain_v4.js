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
const firstLineInVerse = (animal) => `I know an old lady who swallowed a ${animal}.`;
const buildVerse = (verseNumber) => {
    if (verseNumber === 8) {
        const { animal, sentence } = FOOD_CHAIN_DATA[7];
        return `${firstLineInVerse(animal)}\n${sentence}\n`;
    }
    const lines = [];
    const reversedFoodChain = FOOD_CHAIN_DATA.slice(0, verseNumber).reverse();
    for (let i = 0; i < reversedFoodChain.length; i++) {
        const { animal, sentence, description } = reversedFoodChain[i];
        if (i === 0) {
            lines.push(firstLineInVerse(animal));
        }
        else {
            const previousAnimal = reversedFoodChain[i - 1].animal;
            lines.push(`She swallowed the ${previousAnimal} to catch the ${animal}${description || ''}.`);
        }
        if (i === 0 || i === reversedFoodChain.length - 1) {
            lines.push(sentence);
        }
    }
    return lines.join('\n') + '\n';
};
const verse = (verseNumber) => buildVerse(verseNumber);
const verses = (minVerse = 1, maxVerse = 8) => {
    let result = '';
    for (let i = minVerse; i <= maxVerse; i++) {
        result += buildVerse(i);
        if (i < maxVerse) {
            result += '\n';
        }
    }
    return result;
};
exports.default = { verse, verses };
