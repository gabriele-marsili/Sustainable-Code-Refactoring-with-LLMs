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
    if (v <= 1) return [start + end];
    
    const result: string[] = new Array(v);
    result[0] = start + ` ${rhymes[v - 2][0]}`;
    
    for (let i = v - 2; i >= 1; i--) {
        result[v - i - 1] = rhymes[i - 1][1] + ` ${rhymes[i - 1][0]}`;
    }
    
    result[v - 1] = rhymes[0][1] + end;
    return result;
}

export function verses(startVerse: number, endVerse: number): string[] {
    const totalLines = (endVerse - startVerse + 1) * (startVerse + endVerse) / 2 + (endVerse - startVerse);
    const result: string[] = new Array(totalLines);
    let index = 0;
    
    for (let i = startVerse; i <= endVerse; i++) {
        const verseLines = verse(i);
        for (let j = 0; j < verseLines.length; j++) {
            result[index++] = verseLines[j];
        }
        if (i < endVerse) result[index++] = '';
    }
    
    return result;
}