export const isPangram = (text = "") => {
  // Use a Set to store unique lowercase letters found in the text.
  // Sets provide efficient O(1) average time complexity for adding and checking existence.
  const uniqueLetters = new Set();

  // Convert the input text to lowercase once to avoid repeated conversions.
  const lowerCaseText = text.toLowerCase();

  // Iterate over each character in the lowercased text.
  // This avoids creating an intermediate string via `replace(/[^a-z]/g, "")`
  // which can be less efficient for long strings and regex processing overhead.
  for (let i = 0; i < lowerCaseText.length; i++) {
    const char = lowerCaseText[i];
    // Check if the character is a lowercase English letter ('a' through 'z').
    // This efficiently filters out non-alphabetic characters.
    if (char >= 'a' && char <= 'z') {
      uniqueLetters.add(char);
    }
  }

  // A pangram must contain all 26 unique letters of the English alphabet.
  // If the set contains exactly 26 unique letters, it means all 'a' through 'z'
  // must have been added (as only 'a'-'z' chars are added).
  // This provides a highly efficient O(1) final check, eliminating the need
  // to iterate through the alphabet string again.
  return uniqueLetters.size === 26;
};