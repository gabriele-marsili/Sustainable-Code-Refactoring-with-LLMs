import java.util.stream.IntStream;

class PangramChecker {

  boolean isPangram(String input) {
    boolean[] seenLetters = new boolean[26]; // Tracks presence of 'a' through 'z'
    int distinctLettersFound = 0;

    for (int i = 0; i < input.length(); i++) {
      char c = input.charAt(i);
      char lowerC = Character.toLowerCase(c); // Convert to lowercase once per character

      if (lowerC >= 'a' && lowerC <= 'z') {
        int index = lowerC - 'a'; // Calculate index for the boolean array
        if (!seenLetters[index]) {
          seenLetters[index] = true;
          distinctLettersFound++;

          // Early exit: if all 26 letters are found, no need to check further
          if (distinctLettersFound == 26) {
            return true;
          }
        }
      }
    }

    // Return true if exactly 26 distinct English letters were found
    return distinctLettersFound == 26;
  }

}