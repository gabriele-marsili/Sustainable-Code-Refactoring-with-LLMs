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
    if (text == null || text.trim().isEmpty()) return "Fine. Be that way!";

    String trimmed = text.trim();
    boolean isQuestion = trimmed.endsWith("?");
    boolean shouting = isShouting(trimmed);

    if (shouting && isQuestion) return "Calm down, I know what I'm doing!";
    if (shouting) return "Whoa, chill out!";
    if (isQuestion) return "Sure.";
    return "Whatever.";
  }

}