import java.util.Arrays;

class PangramChecker {

  boolean isPangram(String input) {
    // A pangram must contain at least 26 distinct English letters.
    // If the input string is shorter than 26 characters, it cannot be a pangram.
    // This is an early exit condition, saving unnecessary computation.
    if (input.length() < 26) {
      return false;
    }

    // Use a boolean array to efficiently track the presence of each letter 'a' through 'z'.
    // The array has 26 elements, one for each letter.
    // alphabetPresent[0] corresponds to 'a', alphabetPresent[1] to 'b', and so on.
    boolean[] alphabetPresent = new boolean[26];
    int distinctLettersFound = 0; // Counter for the number of unique letters found

    // Iterate through each character of the input string.
    for (int i = 0; i < input.length(); i++) {
      char c = input.charAt(i);

      // Convert the character to lowercase.
      // We only care about English letters 'a' through 'z'.
      if (c >= 'A' && c <= 'Z') {
        c = (char) (c - 'A' + 'a'); // Efficiently convert uppercase to lowercase ASCII characters
      }

      // Check if the character is a lowercase English letter.
      if (c >= 'a' && c <= 'z') {
        int index = c - 'a'; // Calculate the corresponding index (0-25) in the boolean array.

        // If this letter has not been marked as present yet:
        if (!alphabetPresent[index]) {
          alphabetPresent[index] = true; // Mark it as present.
          distinctLettersFound++;        // Increment the count of distinct letters found.

          // Optimization: If all 26 distinct letters have been found, we can immediately
          // conclude that it's a pangram and return true without processing the rest of the string.
          if (distinctLettersFound == 26) {
            return true;
          }
        }
      }
    }

    // After iterating through the entire string, return true only if all 26 distinct
    // English letters were found.
    return distinctLettersFound == 26;
  }
}