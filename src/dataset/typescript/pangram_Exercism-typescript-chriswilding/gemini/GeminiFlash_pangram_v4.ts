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
        // A Set is an efficient data structure for tracking unique characters.
        const seen = new Set<string>();
        // Define the target number of unique letters for a pangram.
        const PANGRAM_SIZE = 26; // 'a' through 'z'

        // Iterate through the input string character by character.
        // This avoids creating a new, potentially large, lowercase string
        // using `this.#input.toLowerCase()`, which saves memory and CPU cycles.
        for (let i = 0; i < this.#input.length; i++) {
            const charCode = this.#input.charCodeAt(i);

            let lowerCaseChar: string | null = null;

            // Check if the character is an ASCII uppercase letter (A-Z).
            // ASCII 'A' is 65, 'Z' is 90.
            if (charCode >= 65 && charCode <= 90) {
                // Convert uppercase to lowercase by adding 32 to its ASCII code.
                // (e.g., 'A' (65) + 32 = 'a' (97))
                lowerCaseChar = String.fromCharCode(charCode + 32);
            }
            // Check if the character is an ASCII lowercase letter (a-z).
            // ASCII 'a' is 97, 'z' is 122.
            else if (charCode >= 97 && charCode <= 122) {
                // The character is already lowercase.
                lowerCaseChar = String.fromCharCode(charCode);
            }

            // If the character is a recognized ASCII letter (either uppercase or lowercase),
            // add its lowercase form to the Set.
            if (lowerCaseChar !== null) {
                seen.add(lowerCaseChar);
                // Early exit optimization: If we have already found all 26 unique
                // letters, there's no need to continue processing the rest of the string.
                // This significantly improves performance for pangrams found early
                // in long strings and reduces unnecessary computations.
                if (seen.size === PANGRAM_SIZE) {
                    return true;
                }
            }
        }

        // After iterating through the entire string, return true if all 26 letters were seen.
        return seen.size === PANGRAM_SIZE;
    }
}

export default Pangram