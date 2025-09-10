type Animal = {
    name: string;
    secondVerse?: string;
};

const animals: Animal[] = [
    { name: 'fly' },
    { name: 'spider', secondVerse: 'It wriggled and jiggled and tickled inside her.' },
    { name: 'bird', secondVerse: 'How absurd to swallow a bird!' },
    { name: 'cat', secondVerse: 'Imagine that, to swallow a cat!' },
    { name: 'dog', secondVerse: 'What a hog, to swallow a dog!' },
    { name: 'goat', secondVerse: 'Just opened her throat and swallowed a goat!' },
    { name: 'cow', secondVerse: `I don't know how she swallowed a cow!` },
    { name: 'horse', secondVerse: `She's dead, of course!` },
];

export function verse(v: number): string {
    const lines: string[] = [];
    const animal = animals[v - 1];

    lines.push(`I know an old lady who swallowed a ${animal.name}.`);
    if (v === animals.length) {
        lines.push(`She's dead, of course!`);
    } else {
        if (animal.secondVerse) lines.push(animal.secondVerse);
        for (let i = v - 1; i > 0; i--) {
            const current = animals[i];
            const previous = animals[i - 1];
            lines.push(
                `She swallowed the ${current.name} to catch the ${previous.name}${
                    i - 1 === 1 ? ' that wriggled and jiggled and tickled inside her.' : '.'
                }`
            );
        }
        lines.push(`I don't know why she swallowed the fly. Perhaps she'll die.`);
    }

    return lines.join('\n');
}

export function verses(first: number, last: number): string {
    return Array.from({ length: last - first + 1 }, (_, i) => verse(first + i)).join('\n\n');
}