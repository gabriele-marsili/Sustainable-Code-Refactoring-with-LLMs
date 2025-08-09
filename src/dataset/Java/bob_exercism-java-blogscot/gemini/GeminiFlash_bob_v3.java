import java.lang.Character;

public class Bob {

  private boolean isShouting(String text) {
    boolean hasLetter = false;
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      if (Character.isLetter(c)) {
        hasLetter = true;
        if (Character.isLowerCase(c)) {
          return false; // Found a lowercase letter, so it's not shouting
        }
      }
    }
    // It's shouting only if there was at least one letter and all letters found were uppercase
    return hasLetter;
  }

  String hey(String text) {
    // Efficiently build the 'letters' string by iterating characters directly,
    // avoiding the overhead of regex compilation and execution.
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      // The original regex `([^\\w?])` filters out characters that are NOT
      // word characters (`\w` which is `[a-zA-Z0-9_]`) and NOT `?`.
      // So, we keep characters that ARE word characters or ARE `?`.
      if (Character.isLetterOrDigit(c) || c == '_' || c == '?') {
        sb.append(c);
      }
    }
    String letters = sb.toString();

    // Cache results of conditions to avoid re-computation and improve readability
    boolean shouting = isShouting(letters);
    boolean endsWithQuestion = letters.endsWith("?");
    boolean blank = letters.isBlank();

    // Apply the original logic with the optimized 'letters' string and cached booleans
    if (shouting && endsWithQuestion) {
      return "Calm down, I know what I'm doing!";
    }
    if (shouting) {
      return "Whoa, chill out!";
    }
    if (endsWithQuestion) {
      return "Sure.";
    }
    if (blank) {
      return "Fine. Be that way!";
    }
    return "Whatever.";
  }
}