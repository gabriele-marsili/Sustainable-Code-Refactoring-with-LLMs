export const isPangram = (text) => {
  // An early exit if the text is too short to possibly contain all 26 unique alphabet letters.
  // This avoids further processing for many non-pangram cases.
  if (text.length < 26) {
    return false;
  }

  // Use a Set to store unique alphabet letters found in the text.
  // Set lookups (add) and size checks are very efficient (average O(1)).
  const foundLetters = new Set();

  // Convert the entire text to lowercase once to handle case-insensitivity,
  // avoiding repeated calls within the loop and creating a single intermediate string.
  const lowerText = text.toLowerCase();

  // Iterate over each character of the lowercased text.
  // Using a traditional for loop and charCodeAt is often performant in JS for string iteration.
  for (let i = 0; i < lowerText.length; i++) {
    const charCode = lowerText.charCodeAt(i);

    // Check if the character is a lowercase English alphabet letter (a-z).
    // ASCII values: 'a' is 97, 'z' is 122.
    if (charCode >= 97 && charCode <= 122) {
      foundLetters.add(lowerText[i]);

      // Optimization: If all 26 unique alphabet letters have been found,
      // we can immediately return true without processing the rest of the text.
      if (foundLetters.size === 26) {
        return true;
      }
    }
  }

  // After checking all characters, return true if exactly 26 unique alphabet letters were found,
  // indicating all letters of the English alphabet are present.
  return foundLetters.size === 26;
};