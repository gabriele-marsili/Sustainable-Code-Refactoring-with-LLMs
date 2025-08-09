const isLowerCaseASCIILetter = (input: string): boolean => {
    // This function's signature and core logic are preserved as per requirements.
    const c = input.charCodeAt(0);
    return c >= 97 && c < 123;
};

class Pangram {
    #input: string;

    constructor(input: string) {
        this.#input = input;
    }

    isPangram(): boolean {
        // Use a bitmask (an integer) to efficiently track the presence of each of the 26 lowercase ASCII letters.
        // This is significantly more memory-efficient and faster than using a Set for a fixed, small alphabet,
        // as it avoids object overhead and hash table operations.
        let seenLettersMask = 0; // Each bit from 0 to 25 will represent a letter 'a' through 'z'.
        const ALL_LETTERS_MASK = (1 << 26) - 1; // Represents all 26 bits set (e.g., binary 11...1 for 26 ones).

        // Iterate over the input string character by character.
        // This avoids creating a new, potentially large, string for the entire lowercase version of the input
        // via `this.#input.toLowerCase()`, which can be a significant memory and CPU overhead.
        for (let i = 0; i < this.#input.length; i++) {
            let charCode = this.#input.charCodeAt(i);

            // Convert uppercase ASCII letters to their lowercase equivalents.
            // 'A' (ASCII 65) to 'Z' (ASCII 90) become 'a' (97) to 'z' (122) by adding 32.
            if (charCode >= 65 && charCode <= 90) {
                charCode += 32;
            }

            // Check if the character (potentially lowercased) is a lowercase ASCII letter.
            // This logic effectively replaces the original `isLowerCaseASCIILetter(c)` calls
            // after the implicit `toLowerCase()` on the entire string.
            if (charCode >= 97 && charCode <= 122) {
                // Calculate the 0-based index for the letter (0 for 'a', 1 for 'b', ..., 25 for 'z').
                const letterIndex = charCode - 97;

                // Set the corresponding bit in the `seenLettersMask`.
                // Bitwise OR is very fast.
                seenLettersMask |= (1 << letterIndex);

                // Early exit: If all 26 unique letters have been found (i.e., all 26 bits are set),
                // we can stop processing the rest of the string immediately. This significantly
                // reduces execution time for long strings that are pangrams early on.
                if (seenLettersMask === ALL_LETTERS_MASK) {
                    return true;
                }
            }
        }

        // After iterating through the entire string, return true if all 26 bits are set,
        // meaning all lowercase ASCII letters were found. Otherwise, return false.
        return seenLettersMask === ALL_LETTERS_MASK;
    }
}

export default Pangram;