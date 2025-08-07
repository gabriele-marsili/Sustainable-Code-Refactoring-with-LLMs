const isLowerCaseASCIILetter = (c: string): boolean => {
    const code = c.charCodeAt(0)
    return code >= 97 && code <= 122
}

class Pangram {
    #input: string

    constructor(input: string) {
        this.#input = input
    }

    isPangram(): boolean {
        let mask = 0
        let count = 0
        for (let i = 0, len = this.#input.length; i < len; i++) {
            const code = this.#input.charCodeAt(i) | 32
            if (code >= 97 && code <= 122) {
                const bit = 1 << (code - 97)
                if ((mask & bit) === 0) {
                    mask |= bit
                    if (++count === 26) return true
                }
            }
        }
        return false
    }
}

export default Pangram