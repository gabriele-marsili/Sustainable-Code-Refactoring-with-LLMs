import static java.util.Objects.requireNonNull;

class Acronym {
  private final String acronym;

  Acronym(String phrase) {
    requireNonNull(phrase);

    StringBuilder acronymBuilder = new StringBuilder();
    boolean firstChar = true;
    for (int i = 0; i < phrase.length(); i++) {
      char c = phrase.charAt(i);
      if (Character.isLetter(c)) {
        if (firstChar) {
          acronymBuilder.append(Character.toUpperCase(c));
          firstChar = false;
        }
      } else {
        firstChar = (c != '\'');
      }
    }
    acronym = acronymBuilder.toString();
  }

  String getAcronym() {
    return acronym;
  }
}