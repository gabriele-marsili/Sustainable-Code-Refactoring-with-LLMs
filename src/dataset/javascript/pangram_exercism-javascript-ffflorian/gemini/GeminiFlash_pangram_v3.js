export function isPangram(sentence) {
  // Normalize the sentence by trimming whitespace and converting to lowercase.
  // This ensures case-insensitivity and handles leading/trailing spaces.
  const normalizedSentence = sentence.trim().toLowerCase();

  // Initialize a boolean array of size 26 to track the presence of each letter from 'a' to 'z'.
  // Each index corresponds to a letter (e.g., index 0 for 'a', 1 for 'b', ..., 25 for 'z').
  // This uses a fixed, minimal amount of memory and provides O(1) access time for letter tracking.
  const foundLetters = new Array(26).fill(false);

  // Initialize a counter for the number of unique alphabet letters found.
  let uniqueLetterCount = 0;

  // Iterate through each character of the normalized sentence.
  // This is a single pass over the input string, optimizing for CPU usage.
  for (let i = 0; i < normalizedSentence.length; i++) {
    const charCode = normalizedSentence.charCodeAt(i);

    // Check if the current character is a lowercase English alphabet letter.
    // ASCII values: 'a' is 97, 'z' is 122.
    if (charCode >= 97 && charCode <= 122) {
      // Calculate the corresponding index for the 'foundLetters' array.
      // E.g., 'a' (97) - 97 = 0, 'b' (98) - 97 = 1, etc.
      const index = charCode - 97;

      // If this specific letter has not been found yet, mark it as found
      // and increment the unique letter count.
      if (!foundLetters[index]) {
        foundLetters[index] = true;
        uniqueLetterCount++;

        // Early exit optimization: If all 26 unique alphabet letters have been found,
        // we can immediately return true without processing the rest of the sentence.
        // This significantly reduces execution time for long pangram sentences, saving CPU and energy.
        if (uniqueLetterCount === 26) {
          return true;
        }
      }
    }
  }

  // After iterating through the entire sentence, return true if exactly 26 unique
  // alphabet letters were found, indicating it's a pangram; otherwise, return false.
  return uniqueLetterCount === 26;
}