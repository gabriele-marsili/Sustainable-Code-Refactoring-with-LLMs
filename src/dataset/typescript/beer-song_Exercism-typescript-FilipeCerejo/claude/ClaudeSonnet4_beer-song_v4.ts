const verseTemplate = `#begin# bottle#plural# of beer on the wall, #begin# bottle#plural# of beer.
Take #oneit# down and pass it around, #end# bottle#endplural# of beer on the wall.\n`;

const lastVerse = `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.\n`;

const verseCache = new Map<number, string>();

export function verse(index: number): string {
    if (!index) {
        return lastVerse;
    }

    if (verseCache.has(index)) {
        return verseCache.get(index)!;
    }

    const endValue = index - 1;
    const result = verseTemplate
        .replace(/#begin#/g, index.toString())
        .replace(/#end#/g, endValue ? endValue.toString() : 'no more')
        .replace(/#plural#/g, index === 1 ? '' : 's')
        .replace(/#endplural#/g, index === 2 ? '' : 's')
        .replace(/#oneit#/g, index === 1 ? 'it' : 'one');

    verseCache.set(index, result);
    return result;
}

export function sing(initialBottlesCount = 99, takeDownCount = 0): string {
    const verses: string[] = [];
    for (let i = initialBottlesCount; i >= takeDownCount; i--) {
        verses.push(verse(i));
    }
    return verses.join('\n');
}