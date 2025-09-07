class SqueakyClean {
  static String clean(String identifier) {
    if (identifier == null || identifier.isEmpty()) {
      return identifier;
    }
    
    var cleaned = new StringBuilder(identifier.length());
    var capitalizeNext = false;

    for (int i = 0; i < identifier.length(); i++) {
      char c = identifier.charAt(i);
      
      if (c == ' ') {
        cleaned.append('_');
      } else if (c == '-') {
        capitalizeNext = true;
      } else if (c >= '0' && c <= '9') {
        char replacement = switch (c) {
          case '4' -> 'a';
          case '3' -> 'e';
          case '0' -> 'o';
          case '1' -> 'l';
          case '7' -> 't';
          default -> c;
        };
        
        if (replacement != c && Character.isAlphabetic(replacement)) {
          if (capitalizeNext) {
            cleaned.append(Character.toUpperCase(replacement));
            capitalizeNext = false;
          } else {
            cleaned.append(replacement);
          }
        }
      } else if (Character.isAlphabetic(c)) {
        if (capitalizeNext) {
          cleaned.append(Character.toUpperCase(c));
          capitalizeNext = false;
        } else {
          cleaned.append(c);
        }
      }
    }

    return cleaned.toString();
  }
}