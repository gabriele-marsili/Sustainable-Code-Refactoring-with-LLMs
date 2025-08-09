export const isPangram = sentence => {
  let uniqueLetterMask = 0; // A bitmask to track the presence of each unique lowercase English letter.
  // Each bit from 0 to 25 corresponds to 'a' through 'z' respectively.
  let uniqueLetterCount = 0; // Counts the number of distinct English letters found.

  // Convert the entire sentence to lowercase once. This ensures case-insensitivity
  // and simplifies character range checks within the loop, aligning with original behavior.
  const lowercasedSentence = sentence.toLowerCase();

  // Iterate over each character of the lowercased sentence.
  // Direct iteration avoids creating intermediate arrays from spread or regex replacement,
  // reducing memory allocations and improving CPU cache efficiency.
  for (let i = 0; i < lowercasedSentence.length; i++) {
    const charCode = lowercasedSentence.charCodeAt(i);

    // Check if the character is a lowercase English letter ('a' through 'z').
    // ASCII/Unicode values: 'a' is 97, 'z' is 122.
    if (charCode >= 97 && charCode <= 122) {
      // Calculate the bit position for the current letter (0 for 'a', 1 for 'b', ..., 25 for 'z').
      const bitIndex = charCode - 97;

      // Use bitwise operations for efficient tracking of unique letters.
      // Check if this letter's corresponding bit is NOT set in the mask.
      // If it's not set, it means this is a new unique letter we haven't encountered before.
      if (!((uniqueLetterMask >> bitIndex) & 1)) {
        uniqueLetterMask |= (1 << bitIndex); // Set the bit for this unique letter.
        uniqueLetterCount++; // Increment the count of unique letters found.
      }

      // Early exit optimization: If we have already found all 26 unique English letters,
      // we can immediately return true, avoiding unnecessary processing of the rest of the sentence.
      // This significantly reduces CPU cycles and energy consumption for long pangrams.
      if (uniqueLetterCount === 26) {
        return true;
      }
    }
  }

  // After iterating through all characters, return true if exactly 26 unique English letters were found.
  // Otherwise, return false.
  return uniqueLetterCount === 26;
};