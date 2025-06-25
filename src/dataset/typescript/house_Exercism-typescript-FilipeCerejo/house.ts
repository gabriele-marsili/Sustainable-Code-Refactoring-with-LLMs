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
    let result: string[] = [start];

    for (let i = v - 1; i >= 1; i--) {
        result[result.length - 1] += ` ${rhymes[i - 1][0]}`;
        result.push(`${rhymes[i - 1][1]}`);
    }

    result[result.length - 1] += end;
    return result;
}

export function verses(startVerse: number, endVerse: number): string[] {
    let result: string[] = [];

    for (let i = startVerse; i <= endVerse; i++) {
        result.push(...verse(i));
        if (i < endVerse) result.push('');
    }

    return result;
}
