const isLowerCaseASCIILetter = (c: number): boolean => c >= 97 && c <= 122;

class Pangram {
    #input: string;

    constructor(input: string) {
        this.#input = input;
    }

    isPangram(): boolean {
        const seen = new Uint8Array(26);
        let count = 0;

        for (let i = 0, len = this.#input.length; i < len; i++) {
            const code = this.#input.charCodeAt(i) | 32;
            if (isLowerCaseASCIILetter(code)) {
                const index = code - 97;
                if (!seen[index]) {
                    seen[index] = 1;
                    if (++count === 26) return true;
                }
            }
        }

        return false;
    }
}

export default Pangram;