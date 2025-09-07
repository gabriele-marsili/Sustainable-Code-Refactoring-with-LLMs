/**
 * This solution might seem to be unnecessary complicated,
 * but a simple JS RegExp approach would not work e.g. for
 * https://en.wikipedia.org/wiki/Germanic_umlaut.
 */

const isUpperCase = (s: string) => s === s.toUpperCase()

// This might be wrong in some languages.
const isLetter = (char: string) => char.toUpperCase() !== char.toLowerCase()

const wordToAcronym = (word: string) => {
    if (!word) return ''
    
    const firstChar = word[0]
    if (isUpperCase(word)) {
        return firstChar
    }
    
    let result = firstChar.toUpperCase()
    for (let i = 1; i < word.length; i++) {
        const char = word[i]
        if (isUpperCase(char)) {
            result += char
        }
    }
    return result
}

const parse = (s: string) => {
    if (!s) return ''
    
    let result = ''
    let currentWord = ''
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i]
        if (isLetter(char)) {
            currentWord += char
        } else {
            if (currentWord) {
                result += wordToAcronym(currentWord)
                currentWord = ''
            }
        }
    }
    
    if (currentWord) {
        result += wordToAcronym(currentWord)
    }
    
    return result
}

export default {parse}