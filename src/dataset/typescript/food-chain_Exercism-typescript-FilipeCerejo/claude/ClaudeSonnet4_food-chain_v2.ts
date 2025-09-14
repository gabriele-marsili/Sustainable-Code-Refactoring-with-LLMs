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

const ANIMALS_LENGTH = animals.length;
const SPIDER_SUFFIX = ' that wriggled and jiggled and tickled inside her.';
const FLY_ENDING = `I don't know why she swallowed the fly. Perhaps she'll die.\n`;
const DEATH_MESSAGE = `She's dead, of course!\n`;

export function verse(v: number): string {
    const animalIndex = v - 1;
    const animal = animals[animalIndex];
    
    const parts: string[] = [`I know an old lady who swallowed a ${animal.name}.\n`];

    if (v === ANIMALS_LENGTH) {
        parts.push(DEATH_MESSAGE);
    } else {
        if (animal.secondVerse) {
            parts.push(animal.secondVerse, '\n');
        }
        
        const maxIndex = Math.min(animalIndex, ANIMALS_LENGTH - 2);
        for (let i = maxIndex; i > 0; i--) {
            const currentAnimal = animals[i];
            const previousAnimal = animals[i - 1];
            parts.push(
                `She swallowed the ${currentAnimal.name} to catch the ${previousAnimal.name}`,
                i === 1 ? SPIDER_SUFFIX : '.',
                '\n'
            );
        }
        parts.push(FLY_ENDING);
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