import java.util.regex.Pattern;

import static java.util.Objects.requireNonNull;

class Acronym {
  private final String acronym;

  Acronym(String phrase) {
    requireNonNull(phrase);

    StringBuilder result = new StringBuilder();
    for (String word : Pattern.compile("\\W+").split(phrase.replace("'", ""))) {
      if (!word.isEmpty()) {
        result.append(Character.toUpperCase(word.charAt(0)));
      }
    }
    acronym = result.toString();
  }

  String getAcronym() {
    return acronym;
  }
}