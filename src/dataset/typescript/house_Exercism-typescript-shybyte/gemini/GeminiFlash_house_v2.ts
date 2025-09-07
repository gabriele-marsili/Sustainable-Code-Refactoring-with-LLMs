const PARTS = [
    [undefined, 'house that Jack built.'],
    ['lay in', 'malt'],
    ['ate', 'rat'],
    ['killed', 'cat'],
    ['worried', 'dog'],
    ['tossed', 'cow with the crumpled horn'],
    ['milked', 'maiden all forlorn'],
    ['kissed', 'man all tattered and torn'],
    ['married', 'priest all shaven and shorn'],
    ['woke', 'rooster that crowed in the morn'],
    ['kept', 'farmer sowing his corn'],
    ['belonged to', 'horse and the hound and the horn'],
]

function verse(verseNumber: number) {
    if (verseNumber === 1) {
        return ['This is the house that Jack built.'];
    }

    const lines: string[] = [];
    lines.push(`This is the ${PARTS[PARTS.length - verseNumber][1]}`);

    for (let i = PARTS.length - verseNumber + 1; i < PARTS.length; i++) {
        lines.push(`that ${PARTS[i][0]} the ${PARTS[i][1]}`);
    }

    return lines;
}

function verses(start: number, end: number) {
    const result: string[] = [];
    for (let i = start; i <= end; i++) {
        const verseLines = verse(i);
        for (let j = 0; j < verseLines.length; j++) {
            result.push(verseLines[j]);
        }
        result.push('');
    }
    result.pop();
    return result;
}

export default { verse, verses };