class SqueakyClean {
  static String clean(String identifier) {
    var capitalizeNext = false;
    var cleaned = new StringBuilder();

    for (var c : identifier.toCharArray()) {
      switch (c) {
        case ' ' -> cleaned.append('_');
        case '-' -> capitalizeNext = true;
        case '4' -> c = 'a';
        case '3' -> c = 'e';
        case '0' -> c = 'o';
        case '1' -> c = 'l';
        case '7' -> c = 't';
      }

      if (Character.isAlphabetic(c)) {
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
