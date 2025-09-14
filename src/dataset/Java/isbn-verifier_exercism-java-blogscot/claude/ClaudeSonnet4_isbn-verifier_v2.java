class IsbnVerifier {

  boolean isValid(String stringToVerify) {
    if (stringToVerify.isEmpty()) return false;

    int validChars = 0;
    int total = 0;
    
    for (int i = 0; i < stringToVerify.length(); i++) {
      char c = stringToVerify.charAt(i);
      
      if (Character.isDigit(c)) {
        if (validChars >= 10) return false;
        total += (10 - validChars) * (c - '0');
        validChars++;
      } else if (c == 'X' && validChars == 9) {
        total += 10;
        validChars++;
        break;
      } else if (c != '-' && c != ' ') {
        return false;
      }
    }

    return validChars == 10 && total % 11 == 0;
  }
}