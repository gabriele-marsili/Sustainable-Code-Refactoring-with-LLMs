const TOTAL_CHARS = 26;

export const isPangram = (sentence: string): boolean => {
  // Use a Set to efficiently store and track unique lowercase letters encountered.
  // A Set provides O(1) average time complexity for add and has operations,
  // and automatically handles duplicates.
  const seenLetters = new Set<string>();

  // Iterate through the sentence character by character.
  // This avoids creating multiple intermediate strings and arrays (toLowerCase, replace, split, join).
  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i].toLowerCase(); // Convert current character to lowercase once.

    // Check if the character is an English alphabet letter ('a' through 'z').
    // This direct comparison is generally faster than regex or charCodeAt for this specific range.
    if (char >= 'a' && char <= 'z') {
      seenLetters.add(char); // Add the unique letter to the set.

      // Early exit optimization: If we have already found all 26 unique letters,
      // there's no need to process the rest of the sentence. This significantly
      // reduces execution time for long pangram sentences.
      if (seenLetters.size === TOTAL_CHARS) {
        return true;
      }
    }
  }

  // After iterating through the entire sentence, check if the set contains
  // exactly 26 unique letters.
  return seenLetters.size === TOTAL_CHARS;
};