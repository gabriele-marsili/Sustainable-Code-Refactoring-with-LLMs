import java.util.regex.Pattern;

import static java.util.Objects.requireNonNull;

class Acronym {
  private static final Pattern WORD_SEPARATOR = Pattern.compile("\\W+");
  private final String acronym;

  Acronym(String phrase) {
    requireNonNull(phrase);

    StringBuilder result = new StringBuilder();
    String cleanPhrase = phrase.replace("'", "");
    String[] words = WORD_SEPARATOR.split(cleanPhrase);
    
    for (String word : words) {
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