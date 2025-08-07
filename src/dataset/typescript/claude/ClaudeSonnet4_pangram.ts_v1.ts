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
        let letterMask = 0
        
        for (let i = 0; i < this.#input.length; i++) {
            const charCode = this.#input.charCodeAt(i)
            let letterIndex = -1
            
            if (charCode >= 65 && charCode <= 90) {
                letterIndex = charCode - 65
            } else if (charCode >= 97 && charCode <= 122) {
                letterIndex = charCode - 97
            }
            
            if (letterIndex !== -1) {
                letterMask |= (1 << letterIndex)
                if (letterMask === 0x3FFFFFF) {
                    return true
                }
            }
        }
        
        return letterMask === 0x3FFFFFF
    }
}

export default Pangram