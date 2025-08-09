Pangram = function(text) {
    this.text = text
}

// Keeping the original `alphabet` property as part of the interface,
// although it is not directly used in the optimized `isPangram` method.
Pangram.prototype.alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

Pangram.prototype.isPangram = function() {
    // Convert the text to lowercase once to handle case-insensitivity.
    // This creates a new string, but is generally unavoidable for this requirement.
    const textLower = this.text.toLowerCase();

    // Use a bitmask to keep track of the unique letters found.
    // Each bit position (0-25) corresponds to a letter (a-z).
    // If the bit is set, the letter has been found.
    let seenLettersMask = 0;

    // A constant mask representing all 26 bits (for 'a' through 'z') set to 1.
    // (1 << 26) calculates 2^26. Subtracting 1 results in 26 consecutive '1' bits.
    // e.g., for 3 letters: (1 << 3) - 1 = 7 (binary 111)
    const ALL_LETTERS_MASK = (1 << 26) - 1;

    // Iterate through each character of the lowercase text.
    // This is an O(N) operation where N is the length of the text.
    for (const char of textLower) {
        // Get the ASCII (or Unicode) character code.
        const charCode = char.charCodeAt(0);

        // Check if the character is a lowercase English alphabet letter ('a' to 'z').
        // 'a' has charCode 97, 'z' has charCode 122.
        if (charCode >= 97 && charCode <= 122) {
            // Calculate the 0-based index for the letter (0 for 'a', 1 for 'b', ..., 25 for 'z').
            const letterIndex = charCode - 97;

            // Set the corresponding bit in the seenLettersMask.
            // Using bitwise OR (|) ensures that if the bit is already set, it remains set.
            seenLettersMask |= (1 << letterIndex);

            // Early exit optimization: If all 26 bits are set,
            // it means we have found all required alphabet letters.
            // No need to process the rest of the text.
            if (seenLettersMask === ALL_LETTERS_MASK) {
                return true;
            }
        }
    }

    // After iterating through all characters, check if all 26 bits in the mask are set.
    // If they are, the text contains all letters of the alphabet and is a pangram.
    return seenLettersMask === ALL_LETTERS_MASK;
}

export default Pangram;