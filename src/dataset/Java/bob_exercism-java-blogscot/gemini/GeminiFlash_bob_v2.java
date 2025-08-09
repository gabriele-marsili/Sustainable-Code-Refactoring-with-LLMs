import java.util.regex.Pattern;

public class Bob {

  /**
   * Determines if the given text represents shouting.
   * Shouting is defined as containing at least one letter, and all letters being uppercase.
   * This method performs a single pass over the text, avoiding intermediate string creations.
   *
   * @param text The string to check.
   * @return true if the text is shouting, false otherwise.
   */
  private boolean isShouting(String text) {
    boolean hasLetter = false;
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      if (Character.isLetter(c)) {
        hasLetter = true;
        if (Character.isLowerCase(c)) {
          return false; // Found a lowercase letter, so it's not shouting.
        }
      }
    }
    // Returns true only if at least one letter was found AND all found letters were uppercase.
    return hasLetter;
  }

  /**
   * Bob's response logic based on the input text.
   * This method optimizes the process by avoiding expensive regex operations and
   * minimizing string allocations, while preserving original functionality.
   *
   * @param text The input string for Bob's response.
   * @return Bob's appropriate response.
   */
  String hey(String text) {
    // Build the 'letters' string by filtering out characters not relevant to the rules,
    // which aligns with the original `replaceAll("([^\\w?])", "")`.
    // This avoids the overhead of regex compilation and string creation associated with `replaceAll`.
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      // `\w` in regex typically means [a-zA-Z0-9_].
      // So, we keep letters, digits, underscores, and question marks.
      if (Character.isLetterOrDigit(c) || c == '_' || c == '?') {
        sb.append(c);
      }
    }
    String letters = sb.toString();

    // Apply the original conditions in the specified order to maintain functionality.
    // The `isShouting` method is already optimized for performance.
    // The `isBlank()` check on 'letters' correctly handles inputs like "   ", ".,!", etc.,
    // which become an empty string after filtering.
    if (isShouting(letters) && letters.endsWith("?")) {
      return "Calm down, I know what I'm doing!";
    }
    if (isShouting(letters)) {
      return "Whoa, chill out!";
    }
    if (letters.endsWith("?")) {
      return "Sure.";
    }
    if (letters.isBlank()) { // Checks if the filtered string is empty or contains only whitespace characters (which it won't after filtering, so effectively checks if it's empty).
      return "Fine. Be that way!";
    }
    return "Whatever.";
  }
}