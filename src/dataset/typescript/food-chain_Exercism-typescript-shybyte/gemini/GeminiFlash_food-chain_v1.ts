const FOOD_CHAIN = [
    { animal: 'fly', sentence: "I don't know why she swallowed the fly. Perhaps she'll die." },
    { animal: 'spider', sentence: 'It wriggled and jiggled and tickled inside her.', optionalDescription: ' that wriggled and jiggled and tickled inside her' },
    { animal: 'bird', sentence: 'How absurd to swallow a bird!' },
    { animal: 'cat', sentence: 'Imagine that, to swallow a cat!' },
    { animal: 'dog', sentence: 'What a hog, to swallow a dog!' },
    { animal: 'goat', sentence: 'Just opened her throat and swallowed a goat!' },
    { animal: 'cow', sentence: "I don't know how she swallowed a cow!" },
    { animal: 'horse', sentence: "She's dead, of course!" }
];

const firstLineInVerse = (animal: string) => `I know an old lady who swallowed a ${animal}.`;

function verse(verseNumber: number): string {
    if (verseNumber < 1 || verseNumber > 8) {
        return "";
    }

    const lines: string[] = [];

    if (verseNumber === 8) {
        const { animal, sentence } = FOOD_CHAIN[7];
        lines.push(firstLineInVerse(animal));
        lines.push(sentence);
    } else {
        lines.push(firstLineInVerse(FOOD_CHAIN[verseNumber - 1].animal));
        lines.push(FOOD_CHAIN[verseNumber - 1].sentence);

        for (let i = verseNumber - 1; i > 0; i--) {
            const current = FOOD_CHAIN[i - 1];
            const previous = FOOD_CHAIN[i];
            lines.push(`She swallowed the ${previous.animal} to catch the ${current.animal}${current.optionalDescription || ''}.`);
            if (i === 1) {
                lines.push(current.sentence);
            }
        }
    }

    return lines.join('\n') + '\n';
}


function verses(minVerse: number = 1, maxVerse: number = 8): string {
    if (minVerse < 1) minVerse = 1;
    if (maxVerse > 8) maxVerse = 8;
    if (minVerse > maxVerse) return "";

    let result = "";
    for (let i = minVerse; i <= maxVerse; i++) {
        result += verse(i);
        if (i < maxVerse) {
            result += '\n';
        }
    }
    return result;
}

export default { verse, verses };