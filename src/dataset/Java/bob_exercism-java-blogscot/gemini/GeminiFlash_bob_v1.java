public class Bob {

  private boolean isShouting(String text) {
    boolean hasLetter = false;
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      if (Character.isLetter(c)) {
        hasLetter = true;
        if (Character.isLowerCase(c)) {
          return false; // Found a lowercase letter, so not shouting
        }
      }
    }
    return hasLetter; // True if has at least one letter and all letters are uppercase
  }

  String hey(String text) {
    // Replaces text.replaceAll("([^\\w?])", "") with a manual StringBuilder
    // to avoid regular expression engine overhead and temporary string objects.
    StringBuilder filteredTextBuilder = new StringBuilder();
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      // Equivalent to Character.isLetterOrDigit(c) || c == '_' || c == '?'
      if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '_' || c == '?') {
        filteredTextBuilder.append(c);
      }
    }
    String filteredText = filteredTextBuilder.toString();

    // Store results of common checks to avoid redundant computations
    boolean shouting = isShouting(filteredText);
    boolean endsWithQuestion = filteredText.endsWith("?");
    boolean isBlank = filteredText.isBlank(); // Requires Java 11 or later

    if (shouting && endsWithQuestion) {
      return "Calm down, I know what I'm doing!";
    }
    if (shouting) {
      return "Whoa, chill out!";
    }
    if (endsWithQuestion) {
      return "Sure.";
    }
    if (isBlank) {
      return "Fine. Be that way!";
    }
    return "Whatever.";
  }
}