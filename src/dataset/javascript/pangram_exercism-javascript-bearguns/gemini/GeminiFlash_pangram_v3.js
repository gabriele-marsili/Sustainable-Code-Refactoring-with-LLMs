const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

class Pangram {
  constructor(input) {
    this.input = input;
  }

  isPangram() {
    // Sanitize input: convert to lowercase and remove all non-alphabetic characters.
    // This ensures robustness for pangram checking by ignoring punctuation, numbers, and multiple spaces.
    // The original `replace(" ","")` only removed the first space, which was not a correct or robust sanitization.
    const normalizedStr = this.input.toLowerCase().replace(/[^a-z]/g, '');

    // Early exit: If the length of the sanitized string is less than the number of letters in the alphabet,
    // it's impossible for it to be a pangram.
    if (normalizedStr.length < ALPHABET.length) {
      return false;
    }

    // Use a Set to efficiently store unique characters found in the input string.
    // Set lookups (add and has) are, on average, O(1) time complexity.
    const uniqueChars = new Set();

    // Iterate through the normalized string once to collect unique characters.
    // This is more efficient than repeated `indexOf` calls which would iterate the string multiple times.
    for (let i = 0; i < normalizedStr.length; i++) {
      uniqueChars.add(normalizedStr[i]);
      // Optimization: If we've already found all 26 unique letters, we can stop early.
      if (uniqueChars.size === ALPHABET.length) {
        break;
      }
    }

    // After collecting unique characters, iterate through the standard alphabet
    // to check if all letters are present in the set of unique characters.
    for (let i = 0; i < ALPHABET.length; i++) {
      if (!uniqueChars.has(ALPHABET[i])) {
        // If any letter from the alphabet is missing, it's not a pangram.
        return false;
      }
    }

    // If the loop completes, it means all letters from 'a' to 'z' were found.
    return true;
  }
}

export default Pangram;