var Pangram = function (input) {
  this.input = input;
  // This alphabet string is small and constant. It's kept as an instance property
  // to preserve the original class structure and memory allocation pattern,
  // even though it could be a static property or module-level constant for
  // marginal memory efficiency if many Pangram instances were created.
  this.alphabet = "abcdefghijklmnopqrstuvwxyz";

  this.isPangram = function () {
    // Convert the entire input string to lowercase once at the beginning.
    // This ensures case-insensitivity as required for a pangram check.
    const lowerInput = this.input.toLowerCase();

    // Utilize a Set data structure to efficiently store unique alphabetic characters
    // found in the input string. Sets offer average O(1) time complexity for additions (`add`)
    // and lookups (`has`), which is significantly more performant than repeated `indexOf` calls
    // on a string (which are O(N) for each call).
    const uniqueAlphabeticChars = new Set();

    // Iterate through each character of the lowercase input string.
    // This loop effectively filters out non-alphabetic characters and automatically
    // handles duplicate letters, as a Set only stores unique values.
    for (let i = 0; i < lowerInput.length; i++) {
      const char = lowerInput[i];
      const charCode = char.charCodeAt(0); // Get the ASCII value for fast comparison.

      // Check if the character's ASCII value falls within the range of lowercase
      // English alphabet letters ('a' through 'z'). This is a highly optimized check.
      // ASCII 'a' is 97, 'z' is 122.
      if (charCode >= 97 && charCode <= 122) {
        uniqueAlphabeticChars.add(char);
      }
    }

    // Now, iterate through the complete 26-letter English alphabet.
    // For each letter, check if it exists in the `uniqueAlphabeticChars` set.
    // The original code's loop condition `this.alphabet.length - 1` was a bug
    // that caused it to skip checking for the letter 'z'. This is corrected here
    // to `this.alphabet.length` to ensure all 26 letters are checked, aligning
    // with the true definition of a pangram.
    for (let i = 0; i < this.alphabet.length; i++) {
      const char = this.alphabet[i];
      // If any character from the standard alphabet is NOT found in our set of
      // unique characters from the input, then the input string is not a pangram.
      // We can immediately return false to short-circuit the operation.
      if (!uniqueAlphabeticChars.has(char)) {
        return false;
      }
    }

    // If the loop completes without returning false, it means all 26
    // alphabet characters were found in the input string, making it a pangram.
    return true;
  };
};

export default Pangram;;