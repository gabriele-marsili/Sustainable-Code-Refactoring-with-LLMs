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
        let seenLettersMask = 0;
        const ALL_LETTERS_MASK = (1 << 26) - 1;

        for (let i = 0; i < this.#input.length; i++) {
            const charCode = this.#input.charCodeAt(i);

            let normalizedCharCode: number;
            if (charCode >= 65 && charCode <= 90) {
                normalizedCharCode = charCode + 32;
            } else if (charCode >= 97 && charCode <= 122) {
                normalizedCharCode = charCode;
            } else {
                continue;
            }

            const bitPosition = normalizedCharCode - 97;
            seenLettersMask |= (1 << bitPosition);

            if (seenLettersMask === ALL_LETTERS_MASK) {
                return true;
            }
        }

        return seenLettersMask === ALL_LETTERS_MASK;
    }
}

export default Pangram