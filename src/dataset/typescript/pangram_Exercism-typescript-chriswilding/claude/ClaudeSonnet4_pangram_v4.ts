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
            const charCode = this.#input.charCodeAt(i)
            let letterIndex = -1
            
            if (charCode >= 65 && charCode <= 90) {
                letterIndex = charCode - 65
            } else if (charCode >= 97 && charCode <= 122) {
                letterIndex = charCode - 97
            }
            
            if (letterIndex !== -1) {
                seenMask |= (1 << letterIndex)
                if (seenMask === 0x3FFFFFF) {
                    return true
                }
            }
        }
        
        return false
    }
}

export default Pangram