const ALPHABET_SIZE = 26

export default class Pangram {
    text: string

    constructor(text: string) {
        this.text = text
    }

    isPangram(): boolean {
        // Use a boolean array to efficiently track which letters of the alphabet have been seen.
        // Index 0 corresponds to 'a', 1 to 'b', ..., and 25 to 'z'.
        const seenLetters = new Array<boolean>(ALPHABET_SIZE).fill(false);
        let distinctCount = 0; // Counts the number of unique alphabet characters found so far.

        // Pre-calculate char codes for 'a' and 'z' to avoid repeated computations inside the loop.
        const aCode = 'a'.charCodeAt(0);
        const zCode = 'z'.charCodeAt(0);

        // Iterate over each character in the text.
        // Using a simple for loop for potentially better performance than for...of
        // when direct index access is all that's needed.
        for (let i = 0; i < this.text.length; i++) {
            const char = this.text[i];
            const lowerChar = char.toLowerCase(); // Convert character to lowercase once.
            const charCode = lowerChar.charCodeAt(0);

            // Check if the character is an English alphabet letter ('a' through 'z').
            if (charCode >= aCode && charCode <= zCode) {
                const index = charCode - aCode; // Calculate the 0-25 index for the letter.

                // If this letter hasn't been seen before, mark it as seen and increment the count.
                if (!seenLetters[index]) {
                    seenLetters[index] = true;
                    distinctCount++;

                    // Early exit optimization: If we have found all 26 distinct letters,
                    // we can immediately return true without processing the rest of the string.
                    if (distinctCount === ALPHABET_SIZE) {
                        return true;
                    }
                }
            }
        }

        // After iterating through all characters, return true if all 26 distinct letters were found.
        return distinctCount === ALPHABET_SIZE;
    }
}