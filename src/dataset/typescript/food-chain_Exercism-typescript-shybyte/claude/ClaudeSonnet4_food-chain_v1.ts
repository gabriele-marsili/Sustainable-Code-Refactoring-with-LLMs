const FOOD_CHAIN = [
    { animal: 'fly', sentence: "I don't know why she swallowed the fly. Perhaps she'll die.", optionalDescription: '' },
    { animal: 'spider', sentence: 'It wriggled and jiggled and tickled inside her.', optionalDescription: ' that wriggled and jiggled and tickled inside her' },
    { animal: 'bird', sentence: 'How absurd to swallow a bird!', optionalDescription: '' },
    { animal: 'cat', sentence: 'Imagine that, to swallow a cat!', optionalDescription: '' },
    { animal: 'dog', sentence: 'What a hog, to swallow a dog!', optionalDescription: '' },
    { animal: 'goat', sentence: 'Just opened her throat and swallowed a goat!', optionalDescription: '' },
    { animal: 'cow', sentence: "I don't know how she swallowed a cow!", optionalDescription: '' },
    { animal: 'horse', sentence: "She's dead, of course!", optionalDescription: '' }
] as const

function firstLineInVerse(animal: string) {
    return `I know an old lady who swallowed a ${animal}.`
}

function verse(verseNumber: number) {
    const lines: string[] = []
    
    if (verseNumber === 8) {
        const {animal, sentence} = FOOD_CHAIN[7]
        lines.push(firstLineInVerse(animal), sentence)
        return lines.join('\n') + '\n'
    }
    
    const {animal: firstAnimal, sentence: firstSentence} = FOOD_CHAIN[verseNumber - 1]
    lines.push(firstLineInVerse(firstAnimal), firstSentence)
    
    for (let i = verseNumber - 2; i >= 0; i--) {
        const current = FOOD_CHAIN[i]
        const previous = FOOD_CHAIN[i + 1]
        lines.push(`She swallowed the ${previous.animal} to catch the ${current.animal}${current.optionalDescription}.`)
    }
    
    if (verseNumber > 1) {
        lines.push(FOOD_CHAIN[0].sentence)
    }
    
    return lines.join('\n') + '\n'
}

function verses(minVerse = 1, maxVerse = 8) {
    let result = ''
    for (let i = minVerse; i <= maxVerse; i++) {
        result += verse(i)
        if (i < maxVerse) result += '\n'
    }
    return result
}

export default {verse, verses}