const isLowerCaseASCIILetter = (input: string): boolean => {
    const c = input.charCodeAt(0)
    return c >= 97 && c <= 122
}

class Pangram {
    #input: string

    constructor(input: string) {
        this.#input = input
    }

    isPangram(): boolean {
        let mask = 0
        for (let i = 0, len = this.#input.length; i < len; i++) {
            const code = this.#input.charCodeAt(i) | 32
            if (code >= 97 && code <= 122) {
                mask |= 1 << (code - 97)
                if (mask === 0x3FFFFFF) return true
            }
        }
        return false
    }
}

export default Pangram