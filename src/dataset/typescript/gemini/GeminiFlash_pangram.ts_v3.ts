class Pangram {
    #input: string

    constructor(input: string) {
        this.#input = input
    }

    isPangram(): boolean {
        let seenLettersMask = 0;
        const ALL_LETTERS_MASK = (1 << 26) - 1; // Represents all 26 lowercase English letters set as bits

        const aCode = 'a'.charCodeAt(0);
        const zCode = 'z'.charCodeAt(0);
        const ACode = 'A'.charCodeAt(0);
        const ZCode = 'Z'.charCodeAt(0);

        // Iterate over the input string once, character by character
        for (let i = 0; i < this.#input.length; i++) {
            const charCode = this.#input.charCodeAt(i);

            // Check if the character is a lowercase ASCII letter (a-z)
            if (charCode >= aCode && charCode <= zCode) {
                // Map 'a' to bit 0, 'b' to bit 1, ..., 'z' to bit 25
                seenLettersMask |= (1 << (charCode - aCode));
            } 
            // Check if the character is an uppercase ASCII letter (A-Z)
            else if (charCode >= ACode && charCode <= ZCode) {
                // Map 'A' to bit 0 (same as 'a'), 'B' to bit 1 (same as 'b'), etc.
                seenLettersMask |= (1 << (charCode - ACode));
            }

            // Early exit: If all 26 letters have been seen, it's a pangram
            if (seenLettersMask === ALL_LETTERS_MASK) {
                return true;
            }
        }

        // After iterating through the entire string, check if all 26 letters were found
        return seenLettersMask === ALL_LETTERS_MASK;
    }
}

export default Pangram;