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
        let seenMask = 0
        
        for (let i = 0; i < this.#input.length; i++) {
            const c = this.#input.charCodeAt(i)
            let letterIndex = -1
            
            if (c >= 65 && c <= 90) { // A-Z
                letterIndex = c - 65
            } else if (c >= 97 && c <= 122) { // a-z
                letterIndex = c - 97
            }
            
            if (letterIndex !== -1) {
                seenMask |= (1 << letterIndex)
                if (seenMask === 0x3FFFFFF) { // All 26 bits set
                    return true
                }
            }
        }
        
        return false
    }
}

export default Pangram