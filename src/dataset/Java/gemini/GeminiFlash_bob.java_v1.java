import java.lang.Character; // Explicitly import for clarity, though not strictly needed

public class Bob {

  private boolean isShouting(String text) {
    boolean hasLetter = false;
    // Iterate over code points to correctly handle Unicode characters (including supplementary ones).
    // This maintains the original behavior's robustness implied by `codePoints()` usage.
    for (int i = 0; i < text.length(); ) {
      int codePoint = text.codePointAt(i);

      if (Character.isLetter(codePoint)) {
        hasLetter = true;
        if (Character.isLowerCase(codePoint)) { // If any letter is lowercase, it's not shouting
          return false;
        }
      }
      i += Character.charCount(codePoint); // Move to the next code point
    }
    // Returns true only if at least one letter was found and all letters were uppercase.
    return hasLetter;
  }

  String hey(String text) {
    // Optimize `text.replaceAll("([^\\w?])", "")`
    // The `\w` in `replaceAll` without explicit flags (like Pattern.UNICODE_CHARACTER_CLASS)
    // is typically ASCII-only, matching [a-zA-Z0-9_].
    // We build the 'letters' string character by character to avoid regex engine overhead
    // and intermediate string objects, reducing memory allocations and CPU cycles.
    StringBuilder cleanedTextBuilder = new StringBuilder();
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      // Append if it's an ASCII letter, digit, underscore, or a question mark.
      // This accurately reflects `\w` default behavior plus `?`.
      if (Character.isLetterOrDigit(c) || c == '_' || c == '?') {
        cleanedTextBuilder.append(c);
      }
    }
    String letters = cleanedTextBuilder.toString();

    // Prioritize checks for efficiency and common cases:

    // 1. Check for blank/empty string first, as it's a cheap and common exit condition.
    // After cleaning, `letters.isBlank()` means `letters` is empty.
    if (letters.isBlank()) {
      return "Fine. Be that way!";
    }

    // 2. Cache results of potentially more expensive operations to avoid re-computation.
    boolean shouting = isShouting(letters);
    boolean endsWithQuestionMark = letters.endsWith("?");

    // 3. Apply the conditional logic based on cached results.
    if (shouting && endsWithQuestionMark) {
      return "Calm down, I know what I'm doing!";
    }
    if (shouting) {
      return "Whoa, chill out!";
    }
    if (endsWithQuestionMark) {
      return "Sure.";
    }

    // Default response if no other conditions are met.
    return "Whatever.";
  }
}