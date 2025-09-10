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

function firstLineInVerse(animal: string): string {
    return `I know an old lady who swallowed a ${animal}.`;
}

function verse(verseNumber: number): string {
    if (verseNumber === 8) {
        const { animal, sentence } = FOOD_CHAIN[7];
        return `${firstLineInVerse(animal)}\n${sentence}\n`;
    }

    const lines: string[] = [];
    const foodChainPart = FOOD_CHAIN.slice(0, verseNumber).reverse();

    lines.push(firstLineInVerse(foodChainPart[0].animal));
    lines.push(foodChainPart[0].sentence);

    for (let i = 1; i < foodChainPart.length; i++) {
        const { animal, optionalDescription } = foodChainPart[i];
        lines.push(`She swallowed the ${foodChainPart[i - 1].animal} to catch the ${animal}${optionalDescription}.`);
    }

    lines.push(FOOD_CHAIN[0].sentence);
    return lines.join('\n') + '\n';
}

function verses(minVerse = 1, maxVerse = 8): string {
    const result: string[] = [];
    for (let i = minVerse; i <= maxVerse; i++) {
        result.push(verse(i));
    }
    return result.join('\n');
}

export default { verse, verses };