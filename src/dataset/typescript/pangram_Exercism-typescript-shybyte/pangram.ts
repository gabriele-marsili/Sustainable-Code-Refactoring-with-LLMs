const ALPHABET_SIZE = 26

export default class Pangram {
    text: string

    constructor(text: string) {
        this.text = text
    }

    isPangram() {
        const lowercase_alphabetic_chars = this.text
            .toLowerCase()
            .replace(/[^a-z]/g, '')
            .split('')

        return numberOfDistinctElements(lowercase_alphabetic_chars) === ALPHABET_SIZE
    }
}

const numberOfDistinctElements = (array: string[]) => new Set(array).size
