export const isPangram = (text = "") => {
  // Normalize the input text: convert to lowercase and remove any characters
  // that are not lowercase English letters. This ensures consistency and
  // reduces the set of characters to check.
  // The replace operation creates a new string, but it's a necessary
  // preprocessing step for correctness.
  const normalizedText = text.toLowerCase().replace(/[^a-z]/g, "");

  // Use a Set to store unique letters encountered in the normalized text.
  // Sets offer efficient (average O(1) time complexity) additions and lookups,
  // which is ideal for checking uniqueness.
  const foundLetters = new Set();

  // Iterate over each character in the normalized text and add it to the Set.
  // This loop runs once for each character in the input string (after normalization),
  // making its complexity O(M), where M is the length of normalizedText.
  for (let i = 0; i < normalizedText.length; i++) {
    foundLetters.add(normalizedText[i]);
  }

  // Early exit optimization: If the number of unique letters found is less than 26
  // (the total number of letters in the English alphabet), it cannot be a pangram.
  // This avoids the subsequent loop over the alphabet if not enough unique letters are present.
  if (foundLetters.size < 26) {
    return false;
  }

  // Iterate through all 26 lowercase English alphabet letters ('a' through 'z').
  // This loop runs a fixed number of times (26), so its complexity is O(1).
  for (let charCode = 97; charCode <= 122; charCode++) { // ASCII 'a' is 97, 'z' is 122
    const letter = String.fromCharCode(charCode);
    // Check if the current letter from the alphabet is present in our `foundLetters` Set.
    // Set.has() operation is very efficient, typically O(1) on average.
    if (!foundLetters.has(letter)) {
      // If any letter from the alphabet is missing in the text, it's not a pangram.
      return false;
    }
  }

  // If the loop completes, it means all 26 letters were found in the text,
  // so it is a pangram.
  return true;
};