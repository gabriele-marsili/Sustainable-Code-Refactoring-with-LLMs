const PARTS = [
    [undefined, 'horse and the hound and the horn'],
    ['belonged to', 'farmer sowing his corn'],
    ['kept', 'rooster that crowed in the morn'],
    ['woke', 'priest all shaven and shorn'],
    ['married', 'man all tattered and torn'],
    ['kissed', 'maiden all forlorn'],
    ['milked', 'cow with the crumpled horn'],
    ['tossed', 'dog'],
    ['worried', 'cat'],
    ['killed', 'rat'],
    ['ate', 'malt'],
    ['lay in', 'house that Jack built.'],
];

function verse(verseNumber: number): string[] {
    const firstPartIndex = PARTS.length - verseNumber;
    const lines = [`This is the ${PARTS[firstPartIndex][1]}`];
    for (let i = firstPartIndex + 1; i < PARTS.length; i++) {
        lines.push(`that ${PARTS[i][0]} the ${PARTS[i][1]}`);
    }
    return lines;
}

function verses(start: number, end: number): string[] {
    return Array.from({ length: end - start + 1 }, (_, i) => verse(start + i).join('\n'))
        .join('\n\n')
        .split('\n');
}

export default { verse, verses };