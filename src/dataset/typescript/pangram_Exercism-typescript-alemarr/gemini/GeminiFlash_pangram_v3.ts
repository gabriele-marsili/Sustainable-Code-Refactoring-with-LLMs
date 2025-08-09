const TOTAL_CHARS = 26;

export const isPangram = (sentence: string): boolean => {
  const seenChars = new Set<string>();

  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i];
    const lowerChar = char.toLowerCase();

    // Check if the character is an English alphabet letter
    if (lowerChar >= 'a' && lowerChar <= 'z') {
      seenChars.add(lowerChar);

      // Early exit: If we've found all 26 unique letters, it's a pangram
      if (seenChars.size === TOTAL_CHARS) {
        return true;
      }
    }
  }

  // After iterating through the entire sentence, check if all 26 unique letters were found
  return seenChars.size === TOTAL_CHARS;
};