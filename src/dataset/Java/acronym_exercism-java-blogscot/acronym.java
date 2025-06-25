import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static java.util.Objects.requireNonNull;

class Acronym {
  private final String acronym;

  Acronym(String phrase) {
    requireNonNull(phrase);

    acronym = Pattern.compile("\\W+")
        .splitAsStream(phrase.replace("'", ""))
        .map(word -> word.charAt(0))
        .map(Character::toUpperCase)
        .map(c -> Character.toString(c))
        .collect(Collectors.joining());
  }

  String getAcronym() {
    return acronym;
  }

}
