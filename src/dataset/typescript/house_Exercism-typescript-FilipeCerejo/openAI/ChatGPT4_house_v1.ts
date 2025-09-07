const start = 'This is';
const end = ' the house that Jack built.';

type RhymeType = [left: string, right: string];

const rhymes: RhymeType[] = [
    ['the malt', 'that lay in'],
    ['the rat', 'that ate'],
    ['the cat', 'that killed'],
    ['the dog', 'that worried'],
    ['the cow with the crumpled horn', 'that tossed'],
    ['the maiden all forlorn', 'that milked'],
    ['the man all tattered and torn', 'that kissed'],
    ['the priest all shaven and shorn', 'that married'],
    ['the rooster that crowed in the morn', 'that woke'],
    ['the farmer sowing his corn', 'that kept'],
    ['the horse and the hound and the horn', 'that belonged to'],
];

export function verse(v: number): string[] {
    const result: string[] = [start];
    let line = '';

    for (let i = v - 1; i >= 1; i--) {
        line += ` ${rhymes[i - 1][0]}`;
        result.push(`${rhymes[i - 1][1]}`);
    }

    result[0] += line + end;
    return result;
}

export function verses(startVerse: number, endVerse: number): string[] {
    const result: string[] = [];
    for (let i = startVerse; i <= endVerse; i++) {
        result.push(...verse(i), ...(i < endVerse ? [''] : []));
    }
    return result;
}