class SqueakyClean {
  static String clean(String identifier) {
    StringBuilder cleaned = new StringBuilder(identifier.length());
    boolean capitalizeNext = false;

    for (int i = 0, len = identifier.length(); i < len; i++) {
      char c = identifier.charAt(i);
      if (c == ' ') {
        cleaned.append('_');
      } else if (c == '-') {
        capitalizeNext = true;
      } else {
        if (c == '4') c = 'a';
        else if (c == '3') c = 'e';
        else if (c == '0') c = 'o';
        else if (c == '1') c = 'l';
        else if (c == '7') c = 't';

        if (Character.isAlphabetic(c)) {
          cleaned.append(capitalizeNext ? Character.toUpperCase(c) : c);
          capitalizeNext = false;
        }
      }
    }

    return cleaned.toString();
  }
}