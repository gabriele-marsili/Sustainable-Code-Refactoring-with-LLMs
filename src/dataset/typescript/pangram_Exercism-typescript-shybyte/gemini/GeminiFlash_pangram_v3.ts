const ALPHABET_SIZE = 26

export default class Pangram {
    text: string

    constructor(text: string) {
        this.text = text
    }

    isPangram(): boolean {
        // Use a boolean array to efficiently track the presence of each letter from 'a' to 'z'.
        // `seen[0]` corresponds to 'a', `seen[1]` to 'b', and so on, up to `seen[25]` for 'z'.
        // This avoids the overhead of Set operations and string manipulations.
        const seen = new Array<boolean>(ALPHABET_SIZE).fill(false);
        let distinctCount = 0; // Counts how many unique alphabetic characters have been found.

        // Iterate directly over the input string characters.
        // This avoids creating intermediate string copies (from .toLowerCase(), .replace())
        // and an array (.split()), significantly reducing memory allocations and CPU cycles.
        for (let i = 0; i < this.text.length; i++) {
            const charCode = this.text.charCodeAt(i);

            // Convert character to lowercase ASCII code.
            // 'A'-'Z' (65-90) to 'a'-'z' (97-122)
            let lowerCaseCharCode = charCode;
            if (charCode >= 65 && charCode <= 90) { // If uppercase letter
                lowerCaseCharCode = charCode + 32; // Convert to lowercase
            }

            // Check if the character is a lowercase English letter ('a' through 'z').
            // ASCII 'a' is 97, 'z' is 122.
            if (lowerCaseCharCode >= 97 && lowerCaseCharCode <= 122) {
                const index = lowerCaseCharCode - 97; // Calculate the 0-25 index for the letter.

                // If this letter has not been seen yet, mark it as seen and increment the count.
                if (!seen[index]) {
                    seen[index] = true;
                    distinctCount++;

                    // Early exit optimization: If all 26 distinct letters have been found,
                    // we can stop processing the rest of the string immediately.
                    // This is crucial for performance and energy efficiency with long inputs.
                    if (distinctCount === ALPHABET_SIZE) {
                        return true;
                    }
                }
            }
        }

        // After iterating through the entire string, return true if all 26 distinct letters were found.
        return distinctCount === ALPHABET_SIZE;
    }
}