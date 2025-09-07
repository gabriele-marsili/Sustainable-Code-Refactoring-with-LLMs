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
] as const

function verse(verseNumber: number): string[] {
    if (verseNumber === 1) {
        return ['This is the house that Jack built.']
    }
    
    const firstPartIndex = PARTS.length - verseNumber
    const lines: string[] = new Array(verseNumber)
    
    lines[0] = `This is the ${PARTS[firstPartIndex][1]}`
    
    for (let i = 1; i < verseNumber; i++) {
        const partIndex = firstPartIndex + i
        lines[i] = `that ${PARTS[partIndex][0]} the ${PARTS[partIndex][1]}`
    }
    
    return lines
}

function verses(start: number, end: number): string[] {
    const totalLines = (end - start + 1) * (start + end) / 2 + (end - start)
    const result: string[] = new Array(totalLines)
    let resultIndex = 0
    
    for (let i = start; i <= end; i++) {
        const verseLines = verse(i)
        for (let j = 0; j < verseLines.length; j++) {
            result[resultIndex++] = verseLines[j]
        }
        if (i < end) {
            result[resultIndex++] = ''
        }
    }
    
    return result
}

export default {verse, verses}