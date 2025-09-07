class SqueakyClean {
  static String clean(String identifier) {
    var capitalizeNext = false;
    var cleaned = new StringBuilder(identifier.length());

    for (int i = 0; i < identifier.length(); i++) {
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

        if (Character.isLetter(c)) {
          if (capitalizeNext) {
            cleaned.append(Character.toUpperCase(c));
            capitalizeNext = false;
          } else {
            cleaned.append(c);
          }
        }
      }
    }

    return cleaned.toString();
  }
}