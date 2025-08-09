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
    StringBuilder letters = new StringBuilder();
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      if (Character.isLetterOrDigit(c) || c == '?') {
        letters.append(c);
      }
    }
    
    String cleanText = letters.toString();
    boolean isEmpty = cleanText.isEmpty();
    boolean endsWithQuestion = !isEmpty && cleanText.charAt(cleanText.length() - 1) == '?';
    boolean shouting = !isEmpty && isShouting(cleanText);
    
    if (shouting && endsWithQuestion) return "Calm down, I know what I'm doing!";
    if (shouting) return "Whoa, chill out!";
    if (endsWithQuestion) return "Sure.";
    if (isEmpty) return "Fine. Be that way!";
    return "Whatever.";
  }

}