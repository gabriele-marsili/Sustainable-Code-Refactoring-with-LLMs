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
    
    let lineIndex = 1
    for (let i = firstPartIndex + 1; i < PARTS.length; i++) {
        lines[lineIndex++] = `that ${PARTS[i][0]} the ${PARTS[i][1]}`
    }
    
    return lines
}

function verses(start: number, end: number): string[] {
    const totalLines = (end - start + 1) * 2 - 1
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