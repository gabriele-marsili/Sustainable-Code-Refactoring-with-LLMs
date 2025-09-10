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

const flyCatchingEnding = `I don't know why she swallowed the fly. Perhaps she'll die.\n`;

export function verse(v: number): string {
    const animal = animals[v - 1];
    let verse = `I know an old lady who swallowed a ${animal.name}.\n`;

    if (v === animals.length) {
        verse += `She's dead, of course!\n`;
        return verse;
    }

    if (animal.secondVerse) {
        verse += `${animal.secondVerse}\n`;
    }

    for (let i = Math.min(v - 1, animals.length - 2); i > 0; i--) {
        const currentAnimal = animals[i];
        const previousAnimal = animals[i - 1];
        verse += `She swallowed the ${currentAnimal.name} to catch the ${previousAnimal.name}`;
        if (i === 2) {
            verse += ' that wriggled and jiggled and tickled inside her.';
        } else {
            verse += '.';
        }
        verse += '\n';
    }

    verse += flyCatchingEnding;
    return verse;
}

export function verses(first: number, last: number): string {
    let verses = '';
    for (let i = first; i <= last; i++) {
        verses += verse(i);
        if (i !== last) {
            verses += '\n';
        }
    }
    return verses;
}