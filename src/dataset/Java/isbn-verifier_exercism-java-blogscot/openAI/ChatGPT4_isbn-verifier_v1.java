class IsbnVerifier {

  boolean isValid(String stringToVerify) {
    if (stringToVerify == null || stringToVerify.length() < 10) return false;

    int total = 0, digitCount = 0;

    for (int i = 0; i < stringToVerify.length(); i++) {
      char ch = stringToVerify.charAt(i);

      if (ch == 'X' && digitCount == 9) {
        total += 10;
        digitCount++;
      } else if (Character.isDigit(ch)) {
        total += (10 - digitCount) * (ch - '0');
        digitCount++;
      } else if (ch != '-' && ch != ' ') {
        return false;
      }

      if (digitCount > 10) return false;
    }

    return digitCount == 10 && total % 11 == 0;
  }
}