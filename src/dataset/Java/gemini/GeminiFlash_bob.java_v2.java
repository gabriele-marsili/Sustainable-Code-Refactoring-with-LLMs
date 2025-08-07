public class Bob {

  /**
   * Determines if the given text represents "shouting" according to Bob's rules.
   * This means it contains at least one letter, and all letters are uppercase.
   * Digits, symbols, and spaces do not affect the shouting status.
   *
   * Optimized to avoid creating new String objects (like `toUpperCase()`) and
   * to short-circuit as soon as a condition is violated or met.
   * Iterates using code points for full Unicode correctness.
   *
   * @param text The input string to check.
   * @return true if the text is shouting, false otherwise.
   */
  private boolean isShouting(String text) {
    boolean hasLetter = false;
    for (int i = 0; i < text.length(); ) {
      int codePoint = text.codePointAt(i);
      if (Character.isLetter(codePoint)) {
        hasLetter = true;
        if (Character.isLowerCase(codePoint)) {
          return false; // Found a lowercase letter, so it's not shouting
        }
      }
      i += Character.charCount(codePoint);
    }
    // Returns true if at least one letter was found and all letters were uppercase.
    // Returns false if no letters were found (e.g., "123", "!@#").
    return hasLetter;
  }

  /**
   * Bob's response logic based on the input text.
   * Preserves the exact functionality of the original code, including how
   * the 'letters' string is derived and used for specific checks.
   *
   * Optimizations:
   * 1. The `isShouting` helper method is significantly optimized.
   * 2. Boolean flags for conditions are pre-computed once to avoid redundant
   *    method calls and string scans within the if-else chain.
   *
   * @param text The input string for Bob to respond to.
   * @return Bob's response.
   */
  String hey(String text) {
    // According to the original code's functionality, 'letters' is a pre-processed
    // version of the input string, containing only word characters (alphanumeric + underscore)
    // and question marks. This step is crucial for preserving the exact behavior of
    // 'letters.endsWith("?")' and 'letters.isBlank()', as they depend on this
    // filtered content. This regex is still necessary to maintain original behavior.
    final String letters = text.replaceAll("([^\\w?])", "");

    // Pre-compute conditions to avoid redundant method calls.
    // The optimized isShouting method works correctly on 'letters'.
    final boolean lettersAreShouting = isShouting(letters);
    // This check is specific to the 'letters' string, not the original 'text'.
    final boolean lettersEndWithQuestion = letters.endsWith("?");
    // This check determines if 'letters' (the filtered content) is empty or only whitespace.
    final boolean lettersAreBlank = letters.isBlank();

    // Apply Bob's rules in the specified order of precedence.
    if (lettersAreShouting && lettersEndWithQuestion) {
      return "Calm down, I know what I'm doing!";
    }
    if (lettersAreShouting) {
      return "Whoa, chill out!";
    }
    if (lettersEndWithQuestion) {
      return "Sure.";
    }
    if (lettersAreBlank) {
      return "Fine. Be that way!";
    }
    return "Whatever.";
  }
}