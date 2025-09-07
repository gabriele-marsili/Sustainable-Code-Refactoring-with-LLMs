class SqueakyClean {
  static String clean(String identifier) {
    if (identifier.isEmpty()) {
      return identifier;
    }
    
    var capitalizeNext = false;
    var cleaned = new StringBuilder(identifier.length());
    
    for (int i = 0; i < identifier.length(); i++) {
      char c = identifier.charAt(i);
      
      switch (c) {
        case ' ':
          cleaned.append('_');
          break;
        case '-':
          capitalizeNext = true;
          break;
        case '4':
          cleaned.append(capitalizeNext ? 'A' : 'a');
          capitalizeNext = false;
          break;
        case '3':
          cleaned.append(capitalizeNext ? 'E' : 'e');
          capitalizeNext = false;
          break;
        case '0':
          cleaned.append(capitalizeNext ? 'O' : 'o');
          capitalizeNext = false;
          break;
        case '1':
          cleaned.append(capitalizeNext ? 'L' : 'l');
          capitalizeNext = false;
          break;
        case '7':
          cleaned.append(capitalizeNext ? 'T' : 't');
          capitalizeNext = false;
          break;
        default:
          if (Character.isLetter(c)) {
            if (capitalizeNext) {
              cleaned.append(Character.toUpperCase(c));
              capitalizeNext = false;
            } else {
              cleaned.append(c);
            }
          }
          break;
      }
    }
    
    return cleaned.toString();
  }
}