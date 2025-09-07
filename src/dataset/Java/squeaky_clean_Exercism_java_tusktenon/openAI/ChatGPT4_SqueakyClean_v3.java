class SqueakyClean {
  static String clean(String identifier) {
    StringBuilder cleaned = new StringBuilder();
    boolean capitalizeNext = false;

    for (int i = 0, len = identifier.length(); i < len; i++) {
      char c = identifier.charAt(i);

      if (c == ' ') {
        cleaned.append('_');
      } else if (c == '-') {
        capitalizeNext = true;
      } else if (c >= '0' && c <= '7') {
        c = switch (c) {
          case '4' -> 'a';
          case '3' -> 'e';
          case '0' -> 'o';
          case '1' -> 'l';
          case '7' -> 't';
          default -> c;
        };
        if (Character.isAlphabetic(c)) {
          cleaned.append(capitalizeNext ? Character.toUpperCase(c) : c);
          capitalizeNext = false;
        }
      } else if (Character.isAlphabetic(c)) {
        cleaned.append(capitalizeNext ? Character.toUpperCase(c) : c);
        capitalizeNext = false;
      }
    }

    return cleaned.toString();
  }
}