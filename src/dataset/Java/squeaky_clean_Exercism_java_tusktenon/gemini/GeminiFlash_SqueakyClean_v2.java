class SqueakyClean {
  static String clean(String identifier) {
    int n = identifier.length();
    StringBuilder cleaned = new StringBuilder(n);
    boolean capitalizeNext = false;

    for (int i = 0; i < n; i++) {
      char c = identifier.charAt(i);

      switch (c) {
        case ' ':
          cleaned.append('_');
          continue;
        case '-':
          capitalizeNext = true;
          continue;
        case '4':
          c = 'a';
          break;
        case '3':
          c = 'e';
          break;
        case '0':
          c = 'o';
          break;
        case '1':
          c = 'l';
          break;
        case '7':
          c = 't';
          break;
        default:
          break;
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

    return cleaned.toString();
  }
}