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
      } else {
        switch (c) {
          case '4' -> c = 'a';
          case '3' -> c = 'e';
          case '0' -> c = 'o';
          case '1' -> c = 'l';
          case '7' -> c = 't';
        }

        if (Character.isAlphabetic(c)) {
          cleaned.append(capitalizeNext ? Character.toUpperCase(c) : c);
          capitalizeNext = false;
        }
      }
    }

    return cleaned.toString();
  }
}