class PangramChecker {

  boolean isPangram(String input) {
    // A pangram must contain at least 26 distinct English alphabet letters.
    // An initial check for string length can quickly rule out many non-pangrams.
    if (input == null || input.length() < 26) {
      return false;
    }

    // Use a boolean array to efficiently track which letters from 'a' to 'z' have been seen.
    // Index 0 corresponds to 'a', index 1 to 'b', ..., index 25 to 'z'.
    boolean[] seenLetters = new boolean[26];
    int uniqueLetterCount = 0; // Counts how many distinct letters (a-z) have been found.

    // Iterate through each character of the input string once.
    // This provides an O(N) time complexity, where N is the length of the input string.
    // This is significantly more efficient than repeatedly searching the string
    // for each letter of the alphabet (which would be O(26*N)).
    for (int i = 0; i < input.length(); i++) {
      char currentChar = input.charAt(i);

      // Convert the character to lowercase to ensure case-insensitivity.
      char lowerCaseChar = Character.toLowerCase(currentChar);

      // Check if the character is an English alphabet letter ('a' through 'z').
      if (lowerCaseChar >= 'a' && lowerCaseChar <= 'z') {
        // Calculate the corresponding index for the letter (0-25).
        int index = lowerCaseChar - 'a';

        // If this letter has not been seen before, mark it as seen and increment the count.
        if (!seenLetters[index]) {
          seenLetters[index] = true;
          uniqueLetterCount++;

          // If all 26 unique letters have been found, we can immediately confirm it's a pangram
          // and return true, avoiding further unnecessary iteration. This is a crucial early exit
          // for performance.
          if (uniqueLetterCount == 26) {
            return true;
          }
        }
      }
    }

    // If the loop completes and not all 26 unique letters were found, then it's not a pangram.
    // At this point, uniqueLetterCount must be less than 26.
    return false;
  }
}