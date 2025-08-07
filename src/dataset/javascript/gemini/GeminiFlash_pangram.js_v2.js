// Define constants outside the class to ensure they are created once
// and are not associated with each instance, reducing memory footprint
// and improving performance.
const ALPHABET_SIZE = 26; // The number of letters in the English alphabet.
const CHAR_CODE_A = 'a'.charCodeAt(0);
const CHAR_CODE_Z = 'z'.charCodeAt(0);

var Pangram = function (input) {
  this.input = input;
};

Pangram.prototype.isPangram = function () {
  // If the input is empty or falsy, it cannot be a pangram.
  if (!this.input) {
    return false;
  }

  // Convert the input string to lowercase to handle case insensitivity.
  const normalizedInput = this.input.toLowerCase();

  // Use a Set to store unique letters encountered.
  // A Set provides O(1) average time complexity for add and check operations,
  // making it highly efficient for collecting unique elements.
  const uniqueLetters = new Set();

  // Iterate over each character of the normalized input string.
  // Using a traditional for loop with charCodeAt for performance
  // when character codes are needed for range checks.
  for (let i = 0; i < normalizedInput.length; i++) {
    const charCode = normalizedInput.charCodeAt(i);

    // Check if the character's code falls within the range of 'a' to 'z'.
    // This efficiently filters out non-alphabetic characters (numbers, punctuation, spaces).
    if (charCode >= CHAR_CODE_A && charCode <= CHAR_CODE_Z) {
      uniqueLetters.add(charCode); // Add the character's code to the set.

      // Early exit optimization: If we have already found all 26 unique letters,
      // we can immediately return true without processing the rest of the string.
      if (uniqueLetters.size === ALPHABET_SIZE) {
        return true;
      }
    }
  }

  // After iterating through the entire string, return true if the number of
  // unique letters found matches the size of the English alphabet.
  return uniqueLetters.size === ALPHABET_SIZE;
};

export default Pangram;