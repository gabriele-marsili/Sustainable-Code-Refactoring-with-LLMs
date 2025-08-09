const isLowerCaseASCIILetter = (input: string): boolean => {
    // This function is kept as per the requirement to maintain original signatures.
    // It's not directly used in the optimized isPangram logic but could be used elsewhere.
    const c = input.charCodeAt(0)
    return c >= 97 && c < 123
}

class Pangram {
    #input: string

    constructor(input: string) {
        this.#input = input
    }

    isPangram(): boolean {
        // Use a bitmask (an integer) to track seen letters.
        // Each bit from 0 to 25 represents a letter from 'a' to 'z'.
        // For example, bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z'.
        let seenLettersBitmask = 0;

        // The target mask when all 26 lowercase ASCII letters have been seen.
        // (1 << 26) - 1 results in an integer with the first 26 bits set to 1.
        const ALL_LETTERS_MASK = (1 << 26) - 1; // 67108863

        // Iterate over the input string character by character.
        // This avoids creating an entirely new string with `toLowerCase()`,
        // which can be memory-intensive for large inputs.
        for (let i = 0; i < this.#input.length; i++) {
            const charCode = this.#input.charCodeAt(i);

            let normalizedCharCode = charCode;

            // Check if the character is an uppercase ASCII letter (A=65, Z=90).
            if (charCode >= 65 && charCode <= 90) {
                // Convert to its lowercase ASCII equivalent by adding 32.
                // (e.g., 'A'(65) + 32 = 'a'(97))
                normalizedCharCode = charCode + 32;
            }

            // Check if the normalized character is a lowercase ASCII letter (a=97, z=122).
            if (normalizedCharCode >= 97 && normalizedCharCode <= 122) {
                // Calculate the bit position for this letter (0 for 'a', 1 for 'b', etc.).
                const bitPosition = normalizedCharCode - 97;
                // Set the corresponding bit in the bitmask using a bitwise OR.
                // This marks the letter as 'seen'.
                seenLettersBitmask |= (1 << bitPosition);

                // Early exit optimization: If all 26 bits are set, we've found a pangram.
                // This prevents unnecessary further iterations.
                if (seenLettersBitmask === ALL_LETTERS_MASK) {
                    return true;
                }
            }
        }

        // After iterating through all characters, return true if all 26 letters were seen.
        return seenLettersBitmask === ALL_LETTERS_MASK;
    }
}

export default Pangram