class IsbnVerifier {

  boolean isValid(String stringToVerify) {
    if (stringToVerify.isEmpty()) return false;

    int digitCount = 0;
    int total = 0;
    
    for (int i = 0; i < stringToVerify.length(); i++) {
      char c = stringToVerify.charAt(i);
      
      if (Character.isDigit(c)) {
        if (digitCount == 10) return false;
        total += (10 - digitCount) * (c - '0');
        digitCount++;
      } else if (c == 'X') {
        if (digitCount != 9) return false;
        total += 10;
        digitCount++;
      } else if (c != '-') {
        return false;
      }
    }

    return digitCount == 10 && total % 11 == 0;
  }
}