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
        const length = this.#input.length
        
        for (let i = 0; i < length; i++) {
            const c = this.#input.charCodeAt(i)
            if (c >= 65 && c <= 90) {
                seenMask |= 1 << (c - 65)
            } else if (c >= 97 && c <= 122) {
                seenMask |= 1 << (c - 97)
            }
            
            if (seenMask === 0x3FFFFFF) {
                return true
            }
        }
        
        return false
    }
}

export default Pangram