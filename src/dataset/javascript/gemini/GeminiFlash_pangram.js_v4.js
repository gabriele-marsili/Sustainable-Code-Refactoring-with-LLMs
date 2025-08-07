var Pangram = function (input) {
  this.input = input;
  // This property must remain on the instance as per requirements.
  this.alphabet = "abcdefghijklmnopqrstuvwxyz";

  this.isPangram = function () {
    const alphabetLength = this.alphabet.length; // Cache length, which is 26 for English alphabet.
    const cleanedInput = this.input.toLowerCase();

    // Original functionality check for empty string input.
    if (cleanedInput === "") {
      return false;
    }

    // Optimization: A pangram must contain at least 26 unique letters.
    // If the input string is shorter than the alphabet, it cannot be a pangram.
    // This provides an early exit, saving CPU cycles and resources.
    if (cleanedInput.length < alphabetLength) {
      return false;
    }

    // Use a bitmask to efficiently track which letters of the alphabet have been found.
    // Each bit from 0 to 25 represents a letter ('a' to 'z').
    // This is significantly more performant and memory-efficient than using a Set or indexOf.
    let foundLettersBitmask = 0;
    const aCharCode = 'a'.charCodeAt(0); // ASCII value for 'a'

    // Iterate through the cleaned input string once.
    for (let i = 0; i < cleanedInput.length; i++) {
      const charCode = cleanedInput.charCodeAt(i);

      // Check if the character is a lowercase English letter ('a' through 'z').
      // Non-alphabetic characters (spaces, numbers, punctuation) are ignored.
      if (charCode >= aCharCode && charCode < aCharCode + alphabetLength) {
        // Calculate the bit position (0 for 'a', 1 for 'b', ..., 25 for 'z').
        const bitPosition = charCode - aCharCode;
        // Set the corresponding bit in the bitmask using a bitwise OR.
        // This marks the letter as found.
        foundLettersBitmask |= (1 << bitPosition);
      }
    }

    // A pangram means all 26 letters are present.
    // The 'allLettersMask' will have all 26 bits (from 0 to 25) set to 1.
    // For 26 letters, this is (1 << 26) - 1.
    const allLettersMask = (1 << alphabetLength) - 1;

    // Compare the bitmask of found letters with the mask representing all letters.
    // If they are equal, all letters have been found, and it's a pangram.
    return foundLettersBitmask === allLettersMask;
  };
};

export default Pangram;