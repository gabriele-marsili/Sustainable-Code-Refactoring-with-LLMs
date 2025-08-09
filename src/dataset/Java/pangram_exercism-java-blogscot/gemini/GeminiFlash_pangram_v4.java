class PangramChecker {

  boolean isPangram(String input) {
    if (input == null || input.length() < 26) {
      return false; // A pangram must contain at least 26 letters. This is a quick exit.
    }

    boolean[] foundLetters = new boolean[26]; // Represents 'a' through 'z'
    int uniqueLetterCount = 0; // Count of unique lowercase English letters found

    for (int i = 0; i < input.length(); i++) {
      char c = input.charAt(i);

      if (c >= 'a' && c <= 'z') {
        int index = c - 'a';
        if (!foundLetters[index]) {
          foundLetters[index] = true;
          uniqueLetterCount++;
        }
      } else if (c >= 'A' && c <= 'Z') {
        // Convert uppercase to lowercase index
        int index = c - 'A';
        if (!foundLetters[index]) {
          foundLetters[index] = true;
          uniqueLetterCount++;
        }
      }

      // Early exit: if we've found all 26 letters, no need to continue scanning
      if (uniqueLetterCount == 26) {
        return true;
      }
    }

    // After iterating through the entire string, check if all 26 letters were found
    return uniqueLetterCount == 26;
  }

}