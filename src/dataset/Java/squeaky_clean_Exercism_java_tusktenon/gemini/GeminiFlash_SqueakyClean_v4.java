class SqueakyClean {
  static String clean(String identifier) {
    StringBuilder cleaned = new StringBuilder(identifier.length());
    boolean capitalizeNext = false;

    for (int i = 0; i < identifier.length(); i++) {
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