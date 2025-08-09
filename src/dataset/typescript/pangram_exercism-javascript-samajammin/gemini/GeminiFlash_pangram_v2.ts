export default class Pangram {
  readonly phrase: string;

  constructor(phrase: string) {
    // Convert the phrase to lowercase once during construction.
    // This avoids repeated conversions in isPangram and simplifies character checks.
    this.phrase = phrase.toLowerCase();
  }

  isPangram(): boolean {
    // Use a boolean array (or a bitmask for ultimate optimization) to track
    // the presence of each letter 'a' through 'z'.
    // This provides O(1) average-case lookup and insertion, and avoids
    // the overhead of Set's hashing or regex's string processing.
    const seenLetters = new Array<boolean>(26).fill(false);
    let uniqueLetterCount = 0; // Keep track of how many unique letters we've found

    // Iterate over the phrase characters directly.
    // This avoids creating an intermediate array via `match()` and then iterating it.
    for (const char of this.phrase) {
      const charCode = char.charCodeAt(0);

      // Check if the character is a lowercase English letter ('a' to 'z').
      // ASCII values: 'a' is 97, 'z' is 122.
      if (charCode >= 97 && charCode <= 122) {
        const index = charCode - 97; // Map 'a' to 0, 'b' to 1, ..., 'z' to 25

        // If this letter hasn't been seen before, mark it as seen and increment the count.
        if (!seenLetters[index]) {
          seenLetters[index] = true;
          uniqueLetterCount++;

          // Early exit: If we have found all 26 unique letters, it's a pangram.
          // This stops processing the rest of the string, saving CPU cycles.
          if (uniqueLetterCount === 26) {
            return true;
          }
        }
      }
    }

    // If the loop finishes, check if we found all 26 unique letters.
    return uniqueLetterCount === 26;
  }
}