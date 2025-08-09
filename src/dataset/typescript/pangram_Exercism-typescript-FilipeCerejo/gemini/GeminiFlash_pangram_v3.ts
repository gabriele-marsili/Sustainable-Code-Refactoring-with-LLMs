const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function isPangram(phrase: string): boolean {
  // Initialize a boolean array to track the presence of each letter from 'a' to 'z'.
  // This provides O(1) lookup and update, and uses a fixed, minimal memory footprint.
  const seenLetters = new Array<boolean>(26).fill(false);
  let lettersFoundCount = 0; // Counter for the number of unique letters found.

  // Iterate directly over the input phrase to avoid creating an intermediate array
  // (which `phrase.split('')` would do, consuming extra memory and CPU).
  for (const char of phrase) {
    // Convert the character to lowercase to ensure case-insensitivity.
    // This avoids repeated `toLowerCase()` calls later.
    const lowerChar = char.toLowerCase();
    const charCode = lowerChar.charCodeAt(0);

    // Check if the character is a lowercase English letter (ASCII 'a' through 'z').
    // This is more efficient than string `indexOf` or `includes` on `alphabet`.
    if (charCode >= 97 && charCode <= 122) { // 'a' is 97, 'z' is 122 in ASCII
      // Calculate the zero-based index for the letter (e.g., 'a' -> 0, 'b' -> 1, ..., 'z' -> 25).
      const index = charCode - 97;

      // If this letter has not been seen before, mark it as seen and increment the count.
      if (!seenLetters[index]) {
        seenLetters[index] = true;
        lettersFoundCount++;

        // Early exit optimization: If all 26 letters have been found, we can immediately
        // return true, avoiding unnecessary processing of the remaining phrase.
        // This significantly reduces CPU cycles and energy consumption for long phrases.
        if (lettersFoundCount === 26) {
          return true;
        }
      }
    }
  }

  // After iterating through the entire phrase, return true if all 26 letters were found.
  return lettersFoundCount === 26;
}