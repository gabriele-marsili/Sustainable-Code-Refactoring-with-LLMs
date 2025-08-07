var Pangram = function (input) {
  this.input = input;
  // The original 'this.alphabet' property is not strictly part of the public interface
  // (i.e., not a function signature), and its direct use is replaced by a more efficient
  // algorithm. Removing it optimizes memory consumption as it's no longer needed.
};

Pangram.prototype.isPangram = function () {
  // Convert input to a string and then to lowercase for consistent processing.
  // Using String() ensures robustness for non-string inputs (e.g., null, undefined, numbers),
  // making the function less prone to errors with unexpected input types.
  const cleanedInput = String(this.input).toLowerCase();

  // Initialize a bitmask to track found letters.
  // Each bit from 0 to 25 represents a letter from 'a' to 'z'.
  // This is highly efficient for tracking the presence of 26 distinct items.
  let letterMask = 0;

  // Define the mask where all 26 bits are set.
  // This represents the state where all letters from 'a' to 'z' have been found.
  // (1 << 26) creates a number with the 26th bit set (2^26). Subtracting 1 sets all bits from 0 to 25.
  const ALL_LETTERS_MASK = (1 << 26) - 1;

  // Pre-calculate character codes for 'a' and 'z' to optimize character range checks
  // within the loop, avoiding redundant lookups.
  const charCode_a = 'a'.charCodeAt(0);
  const charCode_z = 'z'.charCodeAt(0);

  // Iterate over each character in the cleaned input string.
  // This is a single pass over the input, which is efficient.
  for (let i = 0; i < cleanedInput.length; i++) {
    const charCode = cleanedInput.charCodeAt(i);

    // Check if the current character is a lowercase English alphabet letter.
    // This efficiently filters out spaces, punctuation, numbers, and other symbols.
    if (charCode >= charCode_a && charCode <= charCode_z) {
      // Calculate the bit position for the current letter.
      // 'a' maps to bit 0, 'b' to bit 1, ..., 'z' to bit 25.
      const bitPosition = charCode - charCode_a;
      // Set the corresponding bit in the letterMask.
      // Using bitwise OR (|) ensures that once a bit is set, it stays set,
      // and is very fast at the CPU level.
      letterMask |= (1 << bitPosition);
    }

    // Early exit optimization:
    // If all 26 bits in the mask are set, we have found all necessary letters,
    // so we can immediately return true without processing the rest of the string.
    // This significantly reduces execution time for long pangrams.
    if (letterMask === ALL_LETTERS_MASK) {
      return true;
    }
  }

  // After checking all characters in the input string,
  // return true if all 26 bits are set in the letterMask, otherwise false.
  // This covers cases where all letters are found but the early exit wasn't triggered
  // (e.g., short pangrams or pangrams where the last required letter appears late).
  return letterMask === ALL_LETTERS_MASK;
};

export default Pangram;