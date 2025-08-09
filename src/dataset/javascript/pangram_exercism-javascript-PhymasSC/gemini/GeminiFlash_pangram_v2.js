export const isPangram = sentence => {
  // A bitmask to keep track of the letters found.
  // Each bit corresponds to a letter of the alphabet (a=0, b=1, ..., z=25).
  let foundLettersMask = 0;

  // The target mask represents all 26 bits set, meaning all letters 'a' through 'z' have been found.
  // (1 << 26) creates a number with the 26th bit set (1 followed by 26 zeros).
  // Subtracting 1 from it sets all bits from 0 to 25 to 1.
  const ALL_LETTERS_MASK = (1 << 26) - 1; // Equivalent to 0x3FFFFFF in hexadecimal

  // Iterate over each character in the sentence.
  // Using a traditional for loop is often marginally faster than for...of for strings
  // due to avoiding iterator overhead, especially for very short strings or in highly optimized engines.
  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i];
    const charCode = char.toLowerCase().charCodeAt(0);

    // Check if the character is a lowercase English letter.
    // 'a' has charCode 97, 'z' has charCode 122.
    if (charCode >= 97 && charCode <= 122) {
      // Calculate the bit position (0 for 'a', 1 for 'b', ..., 25 for 'z').
      const bitPosition = charCode - 97;

      // Set the corresponding bit in the mask.
      // The `|=` (bitwise OR assignment) operator ensures that if the bit is already set, it remains set.
      foundLettersMask |= (1 << bitPosition);

      // Early exit: If all 26 bits are set, we've found all letters and can stop processing.
      // This saves unnecessary iterations for long sentences that are pangrams.
      if (foundLettersMask === ALL_LETTERS_MASK) {
        return true;
      }
    }
  }

  // After iterating through the entire sentence, check if all 26 bits are set in the mask.
  return foundLettersMask === ALL_LETTERS_MASK;
};