public class Bob {

  private boolean isShouting(String text) {
    return text.toUpperCase().equals(text) &&
        text.codePoints().mapToObj(i -> (char) i).anyMatch(Character::isLetter);
  }

  String hey(String text) {
    var letters = text.replaceAll("([^\\w?])", "");
    if (isShouting(letters) && letters.endsWith("?")) return "Calm down, I know what I'm doing!";
    if (isShouting(letters)) return "Whoa, chill out!";
    if (letters.endsWith("?")) return "Sure.";
    if (letters.isBlank()) return "Fine. Be that way!";
    return "Whatever.";
  }

}
