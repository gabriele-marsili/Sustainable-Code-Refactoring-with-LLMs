import java.util.regex.Pattern;

import static java.util.Objects.requireNonNull;

class Acronym {
  private static final Pattern WORD_SEPARATOR = Pattern.compile("\\W+");
  private final String acronym;

  Acronym(String phrase) {
    requireNonNull(phrase);

    String cleanPhrase = phrase.replace("'", "");
    String[] words = WORD_SEPARATOR.split(cleanPhrase);
    
    StringBuilder sb = new StringBuilder(words.length);
    for (String word : words) {
      if (!word.isEmpty()) {
        sb.append(Character.toUpperCase(word.charAt(0)));
      }
    }
    
    acronym = sb.toString();
  }

  String getAcronym() {
    return acronym;
  }
}