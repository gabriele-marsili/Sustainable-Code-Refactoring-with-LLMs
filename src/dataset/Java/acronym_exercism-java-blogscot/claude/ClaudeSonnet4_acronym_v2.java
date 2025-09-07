import static java.util.Objects.requireNonNull;

class Acronym {
  private final String acronym;

  Acronym(String phrase) {
    requireNonNull(phrase);

    StringBuilder sb = new StringBuilder();
    boolean nextIsFirst = true;
    
    for (int i = 0; i < phrase.length(); i++) {
      char c = phrase.charAt(i);
      
      if (c == '\'') {
        continue;
      }
      
      if (Character.isLetter(c)) {
        if (nextIsFirst) {
          sb.append(Character.toUpperCase(c));
          nextIsFirst = false;
        }
      } else {
        nextIsFirst = true;
      }
    }
    
    acronym = sb.toString();
  }

  String getAcronym() {
    return acronym;
  }
}