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

export function verse(v: number): string {
    let verse = `I know an old lady who swallowed a ${animals[v - 1].name}.`;
    verse += '\n';

    if (v === animals.length) {
        verse += `She's dead, of course!\n`;
    } else {
        verse += animals[v - 1].secondVerse ? `${animals[v - 1].secondVerse}\n` : '';
        for (let i = Math.min(v - 1, animals.length - 2); i > 0; i--) {
            verse += `She swallowed the ${animals[i].name} to catch the ${animals[i - 1].name}${
                i - 1 === 1 ? ' that wriggled and jiggled and tickled inside her.' : '.'
            }`;
            verse += '\n';
        }
        verse += `I don't know why she swallowed the fly. Perhaps she'll die.\n`;
    }

    return verse;
}

export function verses(first: number, last: number) {
    let verses = '';
    for (let i = first; i <= last; i++) {
        verses += verse(i) + (i === last ? '' : '\n');
    }
    return verses;
}
