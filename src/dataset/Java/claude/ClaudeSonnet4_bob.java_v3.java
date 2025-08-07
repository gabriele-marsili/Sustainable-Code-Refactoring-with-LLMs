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
    boolean hasQuestion = false;
    
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      if (Character.isLetterOrDigit(c)) {
        letters.append(c);
      } else if (c == '?') {
        hasQuestion = true;
      }
    }
    
    String cleanText = letters.toString();
    boolean isEmpty = cleanText.isEmpty();
    boolean shouting = !isEmpty && isShouting(cleanText);
    
    if (shouting && hasQuestion) return "Calm down, I know what I'm doing!";
    if (shouting) return "Whoa, chill out!";
    if (hasQuestion) return "Sure.";
    if (isEmpty) return "Fine. Be that way!";
    return "Whatever.";
  }

}