class PangramChecker {

  boolean isPangram(String input) {
    boolean[] seenLetters = new boolean[26];
    int uniqueLettersFound = 0;

    for (int i = 0; i < input.length(); i++) {
      char ch = input.charAt(i);

      if (ch >= 'A' && ch <= 'Z') {
        ch = (char) (ch - 'A' + 'a');
      }

      if (ch >= 'a' && ch <= 'z') {
        int index = ch - 'a';
        if (!seenLetters[index]) {
          seenLetters[index] = true;
          uniqueLettersFound++;
          if (uniqueLettersFound == 26) {
            return true;
          }
        }
      }
    }

    return uniqueLettersFound == 26;
  }
}