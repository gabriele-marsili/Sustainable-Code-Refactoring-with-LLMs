var Pangram = function (input) {
  this.input = input;
  // The alphabet is a constant and specific to the definition of a Pangram.
  // Keeping it as an instance property adheres to the original structure.
  this.alphabet = "abcdefghijklmnopqrstuvwxyz";

  this.isPangram = function () {
    // Convert the input string to lowercase once to handle case-insensitivity.
    // This avoids repeated conversions inside the loop.
    const lowercasedInput = this.input.toLowerCase();

    // Use a Set to efficiently store unique alphabetic characters found in the input.
    // Sets provide O(1) average time complexity for adding elements and checking size,
    // which is highly efficient for collecting unique items.
    const uniqueLetters = new Set();

    // Iterate through each character of the lowercased input string.
    // This is a single pass (O(N) where N is input string length).
    for (let i = 0; i < lowercasedInput.length; i++) {
      const char = lowercasedInput[i];

      // Check if the character is an English alphabet letter (a-z).
      // This simple character range comparison is more performant than regular expressions
      // or repeated stringindexOf calls for individual characters.
      if (char >= 'a' && char <= 'z') {
        uniqueLetters.add(char); // Add the letter to the Set. Sets automatically handle uniqueness.
      }
    }

    // A pangram must contain all 26 unique letters of the English alphabet.
    // Compare the size of the set of unique letters found with the length of the alphabet.
    // This provides a clear, concise, and efficient final check.
    // This also correctly handles the original bug where `alphabet.length - 1` was used, missing 'z'.
    return uniqueLetters.size === this.alphabet.length;
  };
};

export default Pangram;