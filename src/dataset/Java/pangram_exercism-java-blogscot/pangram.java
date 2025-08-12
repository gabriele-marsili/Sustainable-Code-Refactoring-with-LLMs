import java.util.BitSet;

class PangramChecker {

  boolean isPangram(String input) {
    // Handle null input gracefully to prevent NullPointerException, which aligns with robust software engineering.
    if (input == null) {
      return false;
    }

    // Use a BitSet to efficiently keep track of found letters.
    // A BitSet of size 26 is very memory-efficient for tracking the 26 English alphabet letters.
    BitSet foundLetters = new BitSet(26);

    // Convert the entire input string to lowercase once.
    // This ensures case-insensitivity without repeated conversions inside the loop.
    // Converting to a char array first allows for efficient iteration over characters,
    // avoiding repeated method calls and potential overhead of String.charAt(i).
    char[] chars = input.toLowerCase().toCharArray();

    // Iterate through each character of the lowercase string.
    // This is a single pass (O(N) complexity) over the input string, which is highly efficient
    // compared to the original method's repeated indexOf calls (O(N*M) where M is alphabet size).
    for (char c : chars) {
      // Check if the character is an English alphabet letter ('a' through 'z').
      if (c >= 'a' && c <= 'z') {
        // Set the corresponding bit in the BitSet. For 'a', it's bit 0; for 'b', bit 1, etc.
        foundLetters.set(c - 'a');

        // Early exit optimization: If all 26 unique letters have been found,
        // there's no need to process the rest of the string.
        if (foundLetters.cardinality() == 26) {
          return true;
        }
      }
    }

    // After iterating through the entire string, check if all 26 bits are set.
    // This indicates whether all English alphabet letters were present.
    return foundLetters.cardinality() == 26;
  }
}