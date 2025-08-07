public class Bob {

  private boolean isShouting(String text) {
    boolean hasLetter = false;
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      if (Character.isLetter(c)) {
        hasLetter = true;
        if (Character.isLowerCase(c)) {
          return false;
        }
      }
    }
    return hasLetter;
  }

  String hey(String text) {
    StringBuilder filteredTextBuilder = new StringBuilder();
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      if (Character.isLetterOrDigit(c) || c == '_' || c == '?') {
        filteredTextBuilder.append(c);
      }
    }
    String letters = filteredTextBuilder.toString();

    boolean lettersIsShouting = isShouting(letters);
    boolean lettersEndsWithQuestion = letters.endsWith("?");
    boolean lettersIsBlank = letters.isBlank();

    if (lettersIsShouting && lettersEndsWithQuestion) {
      return "Calm down, I know what I'm doing!";
    }
    if (lettersIsShouting) {
      return "Whoa, chill out!";
    }
    if (lettersEndsWithQuestion) {
      return "Sure.";
    }
    if (lettersIsBlank) {
      return "Fine. Be that way!";
    }
    return "Whatever.";
  }
}