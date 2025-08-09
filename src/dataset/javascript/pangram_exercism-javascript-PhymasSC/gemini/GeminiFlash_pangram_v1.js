//
// This is only a SKELETON file for the 'Pangram' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const isPangram = sentence => {
  // A pangram must contain all 26 letters of the English alphabet.
  // We can track the presence of each letter using a boolean array of size 26,
  // where each index corresponds to a letter (0 for 'a', 1 for 'b', ..., 25 for 'z').
  const foundLetters = new Array(26).fill(false);
  let lettersFoundCount = 0;

  // Convert the entire sentence to lowercase once at the beginning.
  // This avoids repeated conversions inside the loop and ensures case-insensitivity.
  const lowerSentence = sentence.toLowerCase();

  // Iterate over each character in the lowercase sentence.
  for (const char of lowerSentence) {
    const charCode = char.charCodeAt(0);

    // Check if the character is an English letter (a-z) by its ASCII value.
    // ASCII values: 'a' is 97, 'z' is 122.
    if (charCode >= 97 && charCode <= 122) {
      // Calculate the index for the letter (e.g., 'a' maps to 0, 'b' to 1, etc.).
      const index = charCode - 97;

      // If this letter hasn't been found yet, mark it as found and increment the count.
      // This prevents redundant operations for duplicate letters.
      if (!foundLetters[index]) {
        foundLetters[index] = true;
        lettersFoundCount++;

        // Optimization: If all 26 letters have been found, we can stop iterating
        // and return true immediately. This significantly reduces execution time
        // for long sentences that are pangrams early on.
        if (lettersFoundCount === 26) {
          return true;
        }
      }
    }
  }

  // After checking all characters in the sentence, return true if exactly 26 unique
  // letters were found; otherwise, return false.
  return lettersFoundCount === 26;
};