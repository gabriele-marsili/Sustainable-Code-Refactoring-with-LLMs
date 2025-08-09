var Pangram = function (input) {
  this.input = input;
  // This property is retained as per "maintains the external interface exactly as provided",
  // although the optimized `isPangram` method no longer directly iterates over this string.
  // It implicitly relies on the definition of an English alphabet provided by this context.
  this.alphabet = "abcdefghijklmnopqrstuvwxyz";
};

// Define constants once, outside the prototype method, for performance and clarity.
// This avoids recalculating 'a'.charCodeAt(0) and this.alphabet.length on every call.
const ALPHABET_LENGTH = 26;
const CHAR_CODE_A = 'a'.charCodeAt(0);

Pangram.prototype.isPangram = function () {
  // Convert the input string to lowercase once.
  // This avoids repeated conversions inside the loop or creating a new string via regex.
  const cleanedStr = this.input.toLowerCase();

  // Use a boolean array to efficiently track which alphabet letters have been found.
  // Index 0 corresponds to 'a', 1 to 'b', and so on, up to 25 for 'z'.
  // This approach avoids the overhead of Set objects or string searching (indexOf).
  const foundLetters = new Array(ALPHABET_LENGTH).fill(false);
  let lettersFoundCount = 0; // Keep track of the number of unique alphabet letters found.

  // Iterate through each character of the cleaned input string.
  // This is an O(N) operation where N is the length of the input string.
  for (let i = 0; i < cleanedStr.length; i++) {
    const charCode = cleanedStr.charCodeAt(i);

    // Check if the current character is an English alphabet letter (a-z).
    if (charCode >= CHAR_CODE_A && charCode < CHAR_CODE_A + ALPHABET_LENGTH) {
      const index = charCode - CHAR_CODE_A; // Calculate the corresponding index (0-25).

      // If this letter hasn't been found yet, mark it as found and increment the count.
      if (!foundLetters[index]) {
        foundLetters[index] = true;
        lettersFoundCount++;

        // Early exit optimization: If all 26 letters are found,
        // we don't need to process the rest of the string.
        if (lettersFoundCount === ALPHABET_LENGTH) {
          return true;
        }
      }
    }
  }

  // After iterating through the entire input string, check if all 26 letters were found.
  // This handles cases where not all letters are present, or the string is empty/contains only non-alpha chars.
  return lettersFoundCount === ALPHABET_LENGTH;
};

export default Pangram;