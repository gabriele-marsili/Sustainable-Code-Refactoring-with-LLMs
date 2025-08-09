const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function isPangram(phrase: string) {
  const lettersFound = new Set<string>();

  // Optimization: A pangram must contain at least 26 distinct letters.
  // If the phrase is shorter than the alphabet, it cannot be a pangram.
  if (phrase.length < alphabet.length) {
    return false;
  }

  // Iterate directly over the string characters to avoid creating an intermediate array
  for (const char of phrase) {
    // Convert character to lowercase once
    const lowerChar = char.toLowerCase();

    // Efficiently check if the character is a lowercase English letter
    // This avoids iterating through the 'alphabet' string using indexOf.
    if (lowerChar >= 'a' && lowerChar <= 'z') {
      lettersFound.add(lowerChar);

      // Early exit optimization: If all 26 distinct letters have been found,
      // we know it's a pangram, and we can stop processing the rest of the phrase.
      if (lettersFound.size === alphabet.length) {
        return true;
      }
    }
  }

  // After processing the entire phrase, check if all 26 distinct letters were found.
  return lettersFound.size === alphabet.length;
}