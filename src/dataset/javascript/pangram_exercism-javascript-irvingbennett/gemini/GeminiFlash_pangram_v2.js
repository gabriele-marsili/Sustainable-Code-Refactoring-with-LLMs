export const isPangram = (text) => {
  // An early exit if the text is too short to contain all 26 letters.
  // This minimizes processing for obviously non-pangram strings.
  if (text.length < 26) {
    return false;
  }

  // Use a Set to store the unique lowercase English letters encountered.
  // Sets offer O(1) average time complexity for add and check operations,
  // which is more efficient than array.includes() or object lookups for this use case.
  const foundLetters = new Set();

  // Iterate over each character of the input text.
  // Iterating directly over the string avoids creating an intermediate array
  // from `text.split('')`, reducing memory consumption and CPU cycles.
  for (const char of text) {
    // Convert the character to lowercase to ensure case-insensitivity.
    const lowerChar = char.toLowerCase();

    // Check if the character is an English alphabet letter using character codes.
    // This is generally faster than using regex or iterating through a predefined alphabet array.
    if (lowerChar >= 'a' && lowerChar <= 'z') {
      // Add the letter to the set. Sets only store unique values, so duplicates are ignored.
      foundLetters.add(lowerChar);

      // Early exit optimization: If we have already found all 26 unique letters,
      // we don't need to process the rest of the string. This significantly
      // improves performance for long texts that are pangrams.
      if (foundLetters.size === 26) {
        return true;
      }
    }
  }

  // After processing all characters, if the set contains exactly 26 unique letters,
  // then the text is a pangram. Otherwise, it is not.
  return foundLetters.size === 26;
};