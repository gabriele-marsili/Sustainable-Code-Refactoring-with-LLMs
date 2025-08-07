const isLowerCaseASCIILetter = (input: string): boolean => {
    // This function's signature and functionality must be preserved as per requirements.
    // It's already highly efficient for its specific purpose.
    const c = input.charCodeAt(0);
    return c >= 97 && c < 123;
};

class Pangram {
    #input: string;

    constructor(input: string) {
        this.#input = input;
    }

    isPangram(): boolean {
        // Use a bitmask (a single integer) to efficiently track which letters have been seen.
        // Each bit from 0 to 25 will represent a letter from 'a' to 'z' respectively.
        let seenLettersBitmask = 0; // Initialize with no bits set
        let uniqueLetterCount = 0; // Keep track of how many unique letters we've found

        // Iterate directly over the input string characters.
        // This avoids creating an intermediate lowercase string, saving memory and CPU.
        for (let i = 0; i < this.#input.length; i++) {
            const charCode = this.#input.charCodeAt(i);

            let lowercaseAsciiCode: number;

            // Check if the character is an ASCII lowercase letter (a-z)
            if (charCode >= 97 && charCode < 123) { // 'a' is 97, 'z' is 122
                lowercaseAsciiCode = charCode;
            }
            // Check if the character is an ASCII uppercase letter (A-Z)
            else if (charCode >= 65 && charCode < 91) { // 'A' is 65, 'Z' is 90
                // Convert uppercase to its lowercase equivalent
                lowercaseAsciiCode = charCode + 32; // e.g., 'A'(65) + 32 = 'a'(97)
            } else {
                // Character is not an ASCII letter, skip to the next one
                continue;
            }

            // Calculate the bit position for this letter (0 for 'a', 1 for 'b', ..., 25 for 'z')
            const bitPosition = lowercaseAsciiCode - 97;

            // Check if the bit corresponding to this letter is already set in the bitmask.
            // If the bit is NOT set (i.e., the letter hasn't been seen yet)
            if (!((seenLettersBitmask >> bitPosition) & 1)) {
                // Set the bit for this letter in the bitmask.
                seenLettersBitmask |= (1 << bitPosition);
                // Increment the count of unique letters found.
                uniqueLetterCount++;

                // Early exit optimization: If we've found all 26 unique letters,
                // we know it's a pangram and can stop processing the rest of the string.
                if (uniqueLetterCount === 26) {
                    return true;
                }
            }
        }

        // After iterating through the entire string, return true only if all 26 letters were found.
        return uniqueLetterCount === 26;
    }
}

export default Pangram;