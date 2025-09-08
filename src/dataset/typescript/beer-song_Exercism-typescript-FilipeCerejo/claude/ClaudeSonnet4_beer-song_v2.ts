const verseTemplate = `#begin# bottle#plural# of beer on the wall, #begin# bottle#plural# of beer.
Take #oneit# down and pass it around, #end# bottle#endplural# of beer on the wall.\n`;

const lastVerse = `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.\n`;

export function verse(index: number): string {
    if (index === 0) {
        return lastVerse;
    }
    
    const begin = index.toString();
    const end = index === 1 ? 'no more' : (index - 1).toString();
    const plural = index === 1 ? '' : 's';
    const endplural = index === 2 ? '' : 's';
    const oneit = index === 1 ? 'it' : 'one';
    
    return `${begin} bottle${plural} of beer on the wall, ${begin} bottle${plural} of beer.
Take ${oneit} down and pass it around, ${end} bottle${endplural} of beer on the wall.\n`;
}

export function sing(initialBottlesCount = 99, takeDownCount = 0): string {
    const verses: string[] = [];
    for (let i = initialBottlesCount; i >= takeDownCount; i--) {
        verses.push(verse(i));
    }
    return verses.join('\n');
}