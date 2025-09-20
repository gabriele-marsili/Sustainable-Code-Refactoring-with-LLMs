import java.util.regex.Pattern;

import static java.util.Objects.requireNonNull;

class Acronym {
  private final String acronym;

  Acronym(String phrase) {
    requireNonNull(phrase);

    StringBuilder acronymBuilder = new StringBuilder();
    for (String word : Pattern.compile("\\W+").split(phrase.replace("'", ""))) {
      if (!word.isEmpty()) {
        acronymBuilder.append(Character.toUpperCase(word.charAt(0)));
      }
    }
    this.acronym = acronymBuilder.toString();
  }

  String getAcronym() {
    return acronym;
  }
}