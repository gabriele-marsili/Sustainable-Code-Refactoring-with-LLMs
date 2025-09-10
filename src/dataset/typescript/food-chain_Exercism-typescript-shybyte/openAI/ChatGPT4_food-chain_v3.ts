const food = (animal: string, sentence: string, optionalDescription = '') => ({
    animal, sentence, optionalDescription
});

const FOOD_CHAIN = [
    food('fly', "I don't know why she swallowed the fly. Perhaps she'll die."),
    food('spider', 'It wriggled and jiggled and tickled inside her.', ' that wriggled and jiggled and tickled inside her'),
    food('bird', 'How absurd to swallow a bird!'),
    food('cat', 'Imagine that, to swallow a cat!'),
    food('dog', 'What a hog, to swallow a dog!'),
    food('goat', 'Just opened her throat and swallowed a goat!'),
    food('cow', "I don't know how she swallowed a cow!"),
    food('horse', "She's dead, of course!")
];

const firstLineInVerse = (animal: string) => `I know an old lady who swallowed a ${animal}.`;

const verse = (verseNumber: number) => {
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
};

const verses = (minVerse = 1, maxVerse = 8) => {
    const result: string[] = [];
    for (let i = minVerse; i <= maxVerse; i++) {
        result.push(verse(i));
    }
    return result.join('\n');
};

export default { verse, verses };