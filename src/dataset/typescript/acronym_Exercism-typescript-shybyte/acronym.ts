/**
 * This solution might seem to be unnecessary complicated,
 * but a simple JS RegExp approach would not work e.g. for
 * https://en.wikipedia.org/wiki/Germanic_umlaut.
 */

const isUpperCase = (s: string) => s === s.toUpperCase()

// This might be wrong in some languages.
const isLetter = (char: string) => char.toUpperCase() !== char.toLowerCase()

const wordToAcronym = (word: string) => {
    const [head, ...tail] = word
    return isUpperCase(word)
        ? head
        : head.toUpperCase() + tail.filter(isUpperCase).join('')
}

const replacePunctuationWithSpace =
    (s: string) => s.replace(/./g, (s) => isLetter(s) ? s : ' ')

const parse = (s: string) => {
    const words = replacePunctuationWithSpace(s).trim().split(/\s+/)
    return words.map(wordToAcronym).join('')
}

export default {parse}
