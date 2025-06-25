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
]

function verse(verseNumber: number) {
    if (verseNumber === 1) {
        return ['This is the house that Jack built.']
    }
    const firstPartIndex = PARTS.length - verseNumber
    const lines = []
    lines.push(`This is the ${PARTS[firstPartIndex][1]}`)
    for (let i = firstPartIndex + 1; i < PARTS.length; i++) {
        lines.push(`that ${PARTS[i][0]} the ${PARTS[i][1]}`)
    }
    return lines
}

function verses(start: number, end: number) {
    let result: string[] = []
    for (let i = start; i <= end; i++) {
        result = result.concat(verse(i))
        result.push('')
    }
    result.pop()
    return result
}

export default {verse, verses}
