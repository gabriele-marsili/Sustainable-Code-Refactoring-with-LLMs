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
    boolean endsWithQuestion = false;
    
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);
      if (Character.isLetterOrDigit(c) || c == '?') {
        letters.append(c);
        if (c == '?') {
          endsWithQuestion = true;
        } else if (c != '?') {
          endsWithQuestion = false;
        }
      }
    }
    
    String processedText = letters.toString();
    if (processedText.isEmpty()) return "Fine. Be that way!";
    
    boolean shouting = isShouting(processedText);
    
    if (shouting && endsWithQuestion) return "Calm down, I know what I'm doing!";
    if (shouting) return "Whoa, chill out!";
    if (endsWithQuestion) return "Sure.";
    return "Whatever.";
  }

}