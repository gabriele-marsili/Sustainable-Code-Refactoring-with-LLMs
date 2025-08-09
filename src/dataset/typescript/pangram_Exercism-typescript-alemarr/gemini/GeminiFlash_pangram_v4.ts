const TOTAL_CHARS = 26;

export const isPangram = (sentence: string): boolean => {
  // Use a boolean array to track which letters of the alphabet have been seen.
  // This is highly memory-efficient for a fixed, small alphabet size (26 letters).
  // Each index corresponds to a letter: 0 for 'a', 1 for 'b', ..., 25 for 'z'.
  const seenLetters = new Array<boolean>(TOTAL_CHARS).fill(false);
  let foundCount = 0; // Counter for the number of unique letters found so far.

  // Iterate over each character in the input sentence.
  // A simple for loop is generally faster than methods like forEach for arrays/strings
  // and avoids creating iterators.
  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i];
    // Convert the character to lowercase and get its ASCII (UTF-16) code.
    // This handles case-insensitivity without creating new strings for the entire sentence.
    const charCode = char.toLowerCase().charCodeAt(0);

    // Check if the character is a lowercase English alphabet letter ('a' through 'z').
    // 'a' has char code 97, 'z' has char code 122.
    if (charCode >= 97 && charCode <= 122) {
      // Calculate the index for the `seenLetters` array (0-25).
      const index = charCode - 97;

      // If this letter has not been seen before, mark it as seen and increment the count.
      if (!seenLetters[index]) {
        seenLetters[index] = true;
        foundCount++;

        // Optimization: If all 26 unique letters have been found,
        // we can immediately return true without processing the rest of the sentence.
        // This significantly reduces execution time and resource usage for long pangrams.
        if (foundCount === TOTAL_CHARS) {
          return true;
        }
      }
    }
  }

  // After iterating through the entire sentence, check if exactly 26 unique letters were found.
  return foundCount === TOTAL_CHARS;
};