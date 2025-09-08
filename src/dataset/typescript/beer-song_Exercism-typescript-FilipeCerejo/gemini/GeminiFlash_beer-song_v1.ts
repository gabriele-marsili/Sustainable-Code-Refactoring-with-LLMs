const verseTemplate = `#begin# bottle#plural# of beer on the wall, #begin# bottle#plural# of beer.\nTake #oneit# down and pass it around, #end# bottle#endplural# of beer on the wall.\n`;

const lastVerse = `No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n`;

const replacements = {
    begin: /#begin#/g,
    end: /#end#/g,
    plural: /#plural#/g,
    endplural: /#endplural#/g,
    oneit: /#oneit#/g,
};

export function verse(index: number): string {
    if (index) {
        let result = verseTemplate;
        result = result.replace(replacements.begin, index.toString());
        result = result.replace(replacements.end, index - 1 > 0 ? (index - 1).toString() : 'no more');
        result = result.replace(replacements.plural, index === 1 ? '' : 's');
        result = result.replace(replacements.endplural, index === 2 ? '' : 's');
        result = result.replace(replacements.oneit, index === 1 ? 'it' : 'one');
        return result;
    }

    return lastVerse;
}

export function sing(initialBottlesCount: number = 99, takeDownCount: number = 0): string {
    const begin = initialBottlesCount;
    const end = takeDownCount;
    const result: string[] = [];

    for (let i = begin; i >= end; i--) {
        result.push(verse(i));
    }

    return result.join('\n');
}