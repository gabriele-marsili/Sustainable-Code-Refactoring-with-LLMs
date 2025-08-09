public class Bob {

  /**
   * Checks if the given text represents shouting according to Bob's rules.
   * A string is considered shouting if it contains at least one letter and all letters are uppercase.
   * This method operates on a pre-filtered string that only contains word characters and question marks.
   *
   * @param text The filtered string to check.
   * @return true if the text is shouting, false otherwise.
   */
  private boolean isShouting(String text) {
    boolean hasLetter = false;
    boolean allLettersUppercase = true;

    // Iterate through the characters of the string once to determine shouting status.
    // This avoids creating intermediate String objects (like text.toUpperCase())
    // and stream overhead (like codePoints().anyMatch()).
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      if (Character.isLetter(c)) {
        hasLetter = true;
        if (Character.isLowerCase(c)) {
          allLettersUppercase = false; // Found a lowercase letter, so not all uppercase
          // No need to continue checking for uppercase if a lowercase letter is found
          // among the letters. However, we still need to iterate to ensure 'hasLetter'
          // is correctly set if there are subsequent letters.
          // For early exit on 'allLettersUppercase' being false,
          // one could combine this loop with the hasLetter check.
        }
      }
      // Non-letter characters (like digits, underscores, question marks) are ignored for this check,
      // as per the original logic applied to the filtered string.
    }
    return hasLetter && allLettersUppercase;
  }

  /**
   * Bob's response to a given statement.
   *
   * @param text The statement from the user.
   * @return Bob's appropriate response.
   */
  String hey(String text) {
    // Optimize the creation of the 'letters' string to avoid the overhead of
    // regular expressions (replaceAll) and to reduce memory allocations.
    // A StringBuilder is used to efficiently build the filtered string in a single pass.
    StringBuilder filteredTextBuilder = new StringBuilder(text.length());
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      // The original regex `([^\\w?])` removes any character that is NOT a word character (\\w)
      // AND NOT a question mark (?).
      // \\w includes letters (a-zA-Z), digits (0-9), and underscore (_).
      if (Character.isLetterOrDigit(c) || c == '?' || c == '_') {
        filteredTextBuilder.append(c);
      }
    }
    String letters = filteredTextBuilder.toString();

    // Now apply the original decision-making logic using the optimized 'isShouting'
    // method and the efficiently created 'letters' string.
    boolean isShoutingCondition = isShouting(letters);
    boolean endsWithQuestionCondition = letters.endsWith("?");
    boolean isBlankCondition = letters.isBlank(); // Efficiently checks for empty or whitespace-only string

    if (isShoutingCondition && endsWithQuestionCondition) {
      return "Calm down, I know what I'm doing!";
    }
    if (isShoutingCondition) {
      return "Whoa, chill out!";
    }
    if (endsWithQuestionCondition) {
      return "Sure.";
    }
    if (isBlankCondition) {
      return "Fine. Be that way!";
    }
    return "Whatever.";
  }
}