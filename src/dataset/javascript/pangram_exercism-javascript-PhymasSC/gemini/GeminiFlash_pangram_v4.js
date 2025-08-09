export const isPangram = sentence => {
  const alphabet = new Set();

  for (const char of sentence) {
    const lowerChar = char.toLowerCase();

    // Check if the character is a lowercase English letter
    if (lowerChar >= 'a' && lowerChar <= 'z') {
      alphabet.add(lowerChar);

      // If we have found all 26 unique letters, we can stop early
      if (alphabet.size === 26) {
        return true;
      }
    }
  }

  // After checking all characters, return true only if all 26 unique letters were found
  return alphabet.size === 26;
};