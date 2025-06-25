const food = (animal: string, sentence: string, optionalDescription = '') => ({
    animal, sentence, optionalDescription
})

const FOOD_CHAIN = [
    food('fly', "I don't know why she swallowed the fly. Perhaps she'll die."),
    food('spider', 'It wriggled and jiggled and tickled inside her.', ' that wriggled and jiggled and tickled inside her'),
    food('bird', 'How absurd to swallow a bird!'),
    food('cat', 'Imagine that, to swallow a cat!'),
    food('dog', 'What a hog, to swallow a dog!'),
    food('goat', 'Just opened her throat and swallowed a goat!'),
    food('cow', "I don't know how she swallowed a cow!"),
    food('horse', "She's dead, of course!")
]

function firstLineInVerse(animal: string) {
    return `I know an old lady who swallowed a ${animal}.`
}

function verse(verseNumber: number) {
    const lines: string[] = []
    if (verseNumber === 8) {
        const {animal, sentence} = FOOD_CHAIN[7]
        lines.push(firstLineInVerse(animal))
        lines.push(sentence)
    } else {
        const foodChainPart = FOOD_CHAIN.slice(0, verseNumber).reverse()
        foodChainPart.forEach(({animal, sentence, optionalDescription}, i) => {
            if (i === 0) {
                lines.push(firstLineInVerse(animal))
            } else {
                lines.push(`She swallowed the ${foodChainPart[i - 1].animal}`
                    + ` to catch the ${animal}${optionalDescription}.`
                )
            }
            if ((i === 0 || i === foodChainPart.length - 1)) {
                lines.push(sentence)
            }
        })
    }
    return lines.join('\n') + '\n'
}

function verses(minVerse = 1, maxVerse = 8) {
    return Array.from({length: maxVerse - minVerse + 1}, (_, i) => verse(minVerse + i)).join('\n')
}

export default {verse, verses}
