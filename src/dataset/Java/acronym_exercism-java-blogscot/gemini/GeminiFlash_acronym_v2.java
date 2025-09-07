import static java.util.Objects.requireNonNull;

class Acronym {
  private final String acronym;

  Acronym(String phrase) {
    requireNonNull(phrase);

    StringBuilder acronymBuilder = new StringBuilder();
    boolean firstChar = true;

    for (int i = 0; i < phrase.length(); i++) {
      char currentChar = phrase.charAt(i);

      if (Character.isLetter(currentChar)) {
        if (firstChar) {
          acronymBuilder.append(Character.toUpperCase(currentChar));
          firstChar = false;
        }
      } else {
        firstChar = (currentChar == ' ' || currentChar == '-');
      }
    }

    acronym = acronymBuilder.toString();
  }

  String getAcronym() {
    return acronym;
  }
}