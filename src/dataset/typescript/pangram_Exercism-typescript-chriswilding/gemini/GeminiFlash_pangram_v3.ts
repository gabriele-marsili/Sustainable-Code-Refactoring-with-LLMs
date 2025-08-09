class Pangram {
    #input: string

    constructor(input: string) {
        this.#input = input
    }

    isPangram(): boolean {
        // Use a fixed-size boolean array to track seen letters (a-z).
        // This is more memory-efficient and offers faster, direct indexing
        // compared to a Set for a small, known alphabet.
        const seenLetters = new Array<boolean>(26).fill(false);
        let uniqueCount = 0; // Counts how many unique letters from 'a' to 'z' have been found.

        // Pre-calculate ASCII char codes for 'a', 'z', 'A', 'Z' for efficiency.
        const charCodeA = 97; // 'a'.charCodeAt(0)
        const charCodeZ = 122; // 'z'.charCodeAt(0)
        const charCodeUpperA = 65; // 'A'.charCodeAt(0)
        const charCodeUpperZ = 90; // 'Z'.charCodeAt(0)

        // Iterate over the input string character by character.
        // Using a traditional for loop and charCodeAt(i) avoids creating
        // a new string with toLowerCase() and provides efficient access.
        for (let i = 0; i < this.#input.length; i++) {
            const charCode = this.#input.charCodeAt(i);
            let letterIndex: number;

            // Check if the character is a lowercase ASCII letter (a-z).
            if (charCode >= charCodeA && charCode <= charCodeZ) {
                letterIndex = charCode - charCodeA;
            }
            // Check if the character is an uppercase ASCII letter (A-Z).
            else if (charCode >= charCodeUpperA && charCode <= charCodeUpperZ) {
                // Map uppercase to the corresponding lowercase index.
                letterIndex = charCode - charCodeUpperA;
            }
            // If not an ASCII letter, skip to the next character.
            else {
                continue;
            }

            // If this letter hasn't been marked as seen yet:
            if (!seenLetters[letterIndex]) {
                seenLetters[letterIndex] = true; // Mark it as seen.
                uniqueCount++; // Increment the count of unique letters found.

                // Early exit: If all 26 unique letters have been found,
                // no need to process the rest of the string.
                // This significantly reduces CPU cycles for long pangram inputs.
                if (uniqueCount === 26) {
                    return true;
                }
            }
        }

        // After iterating through the entire string, return true only if all 26 unique letters were found.
        return uniqueCount === 26;
    }
}

export default Pangram;