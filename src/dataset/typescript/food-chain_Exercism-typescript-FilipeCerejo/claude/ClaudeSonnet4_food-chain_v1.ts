type Animal = {
    name: string;
    secondVerse?: string;
};

const animals: Animal[] = [
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

const SPIDER_SUFFIX = ' that wriggled and jiggled and tickled inside her.';
const REGULAR_SUFFIX = '.';
const FLY_LINE = `I don't know why she swallowed the fly. Perhaps she'll die.\n`;
const DEAD_LINE = `She's dead, of course!\n`;

export function verse(v: number): string {
    const animalIndex = v - 1;
    const animal = animals[animalIndex];
    const parts: string[] = [`I know an old lady who swallowed a ${animal.name}.\n`];

    if (v === animals.length) {
        parts.push(DEAD_LINE);
    } else {
        if (animal.secondVerse) {
            parts.push(animal.secondVerse, '\n');
        }
        
        const maxIndex = Math.min(animalIndex, animals.length - 2);
        for (let i = maxIndex; i > 0; i--) {
            parts.push(
                `She swallowed the ${animals[i].name} to catch the ${animals[i - 1].name}`,
                i === 2 ? SPIDER_SUFFIX : REGULAR_SUFFIX,
                '\n'
            );
        }
        parts.push(FLY_LINE);
    }

    return parts.join('');
}

export function verses(first: number, last: number) {
    const parts: string[] = [];
    for (let i = first; i <= last; i++) {
        parts.push(verse(i));
        if (i < last) {
            parts.push('\n');
        }
    }
    return parts.join('');
}