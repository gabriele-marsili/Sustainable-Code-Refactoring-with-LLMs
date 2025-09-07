import static java.util.Objects.requireNonNull;

class Acronym {
  private final String acronym;

  Acronym(String phrase) {
    requireNonNull(phrase);

    StringBuilder acronymBuilder = new StringBuilder();
    String cleanedPhrase = phrase.replace("'", "");
    int length = cleanedPhrase.length();
    boolean newWord = true;

    for (int i = 0; i < length; i++) {
      char currentChar = cleanedPhrase.charAt(i);
      if (Character.isLetter(currentChar)) {
        if (newWord) {
          acronymBuilder.append(Character.toUpperCase(currentChar));
          newWord = false;
        }
      } else {
        newWord = true;
      }
    }

    this.acronym = acronymBuilder.toString();
  }

  String getAcronym() {
    return acronym;
  }
}