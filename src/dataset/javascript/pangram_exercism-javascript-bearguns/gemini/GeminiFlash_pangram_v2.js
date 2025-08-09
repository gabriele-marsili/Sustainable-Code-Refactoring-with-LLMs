var Pangram = function (input) {
  this.input = input;
};

Pangram.prototype.isPangram = function () {
  // Convert the input string to lowercase once to avoid repeated conversions.
  const lowercasedInput = this.input.toLowerCase();

  // Use a Set to efficiently store and check for the presence of unique
  // alphabetical characters found in the input. Sets provide average O(1)
  // time complexity for adding and checking membership.
  const foundAlphabetChars = new Set();

  // Iterate through the input string character by character.
  for (let i = 0; i < lowercasedInput.length; i++) {
    const char = lowercasedInput[i];
    const charCode = char.charCodeAt(0);

    // Check if the character is a lowercase English letter ('a' through 'z').
    // ASCII values: 'a' is 97, 'z' is 122.
    if (charCode >= 97 && charCode <= 122) {
      foundAlphabetChars.add(char);

      // Optimization: If we have found all 26 unique English alphabet characters,
      // we can immediately conclude it's a pangram and return true.
      // This avoids processing the rest of the string unnecessarily.
      if (foundAlphabetChars.size === 26) {
        return true;
      }
    }
  }

  // After iterating through the entire input string, check if the set
  // contains all 26 unique English alphabet characters.
  return foundAlphabetChars.size === 26;
};

export default Pangram;