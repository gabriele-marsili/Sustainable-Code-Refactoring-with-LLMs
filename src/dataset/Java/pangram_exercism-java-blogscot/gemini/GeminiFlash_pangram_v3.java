class PangramChecker {

  boolean isPangram(String input) {
    if (input == null || input.length() < 26) {
      return false;
    }

    long seenLetters = 0L;
    final long ALL_LETTERS_MASK = (1L << 26) - 1;

    for (int i = 0; i < input.length(); i++) {
      char c = input.charAt(i);

      if (c >= 'a' && c <= 'z') {
        seenLetters |= (1L << (c - 'a'));
      } else if (c >= 'A' && c <= 'Z') {
        seenLetters |= (1L << (c - 'A'));
      }

      if (seenLetters == ALL_LETTERS_MASK) {
        return true;
      }
    }

    return seenLetters == ALL_LETTERS_MASK;
  }

}