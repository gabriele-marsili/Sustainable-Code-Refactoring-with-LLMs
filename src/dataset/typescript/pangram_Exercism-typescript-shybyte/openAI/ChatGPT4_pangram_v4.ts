const ALPHABET_SIZE = 26

export default class Pangram {
    text: string

    constructor(text: string) {
        this.text = text
    }

    isPangram() {
        const seen = new Set<string>()
        for (let i = 0; i < this.text.length; i++) {
            const code = this.text.charCodeAt(i) | 32
            if (code >= 97 && code <= 122) {
                seen.add(String.fromCharCode(code))
                if (seen.size === ALPHABET_SIZE) return true
            }
        }
        return false
    }
}