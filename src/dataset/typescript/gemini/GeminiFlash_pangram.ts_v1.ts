class Pangram {
    #input: string

    constructor(input: string) {
        this.#input = input
    }

    isPangram(): boolean {
        let seenLettersMask = 0;

        // ASCII character codes for 'a' through 'z' and 'A' through 'Z'
        const A_LOWER_CODE = 97;  // 'a'
        const Z_LOWER_CODE = 122; // 'z'
        const A_UPPER_CODE = 65;  // 'A'
        const Z_UPPER_CODE = 90;  // 'Z'
        const CASE_DIFFERENCE = 32; // 'a' - 'A'

        // A bitmask where all 26 bits are set (representing 'a' through 'z').
        // This is 2^26 - 1.
        const ALL_LETTERS_MASK = (1 << 26) - 1;

        // Iterate through each character of the input string.
        // Avoids creating a new string with `toLowerCase()`.
        for (let i = 0; i < this.#input.length; i++) {
            let charCode = this.#input.charCodeAt(i);

            // Convert uppercase ASCII letters to lowercase
            if (charCode >= A_UPPER_CODE && charCode <= Z_UPPER_CODE) {
                charCode += CASE_DIFFERENCE;
            }

            // Check if the character is a lowercase ASCII letter
            if (charCode >= A_LOWER_CODE && charCode <= Z_LOWER_CODE) {
                // Calculate the bit position (0 for 'a', 1 for 'b', ..., 25 for 'z')
                const bitPosition = charCode - A_LOWER_CODE;
                
                // Set the corresponding bit in our mask to mark this letter as seen
                seenLettersMask |= (1 << bitPosition);

                // Early exit: If all 26 letters have been seen, we can stop processing.
                if (seenLettersMask === ALL_LETTERS_MASK) {
                    return true;
                }
            }
        }

        // After checking all characters, return true if all 26 bits are set in the mask.
        return seenLettersMask === ALL_LETTERS_MASK;
    }
}

export default Pangram