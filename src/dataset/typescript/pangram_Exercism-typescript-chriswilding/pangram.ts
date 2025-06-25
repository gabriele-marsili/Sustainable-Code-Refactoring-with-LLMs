const isLowerCaseASCIILetter = (input: string): boolean => {
    const c = input.charCodeAt(0)
    return c >= 97 && c < 123
}

class Pangram {
    #input: string

    constructor(input: string) {
        this.#input = input
    }

    isPangram(): boolean {
        const seen = new Set()
        for (const c of this.#input.toLowerCase()) {
            if (isLowerCaseASCIILetter(c)) {
                seen.add(c)
            }
        }
        return seen.size === 26
    }
}

export default Pangram
