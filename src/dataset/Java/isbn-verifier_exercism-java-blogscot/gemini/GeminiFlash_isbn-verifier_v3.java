class IsbnVerifier {

  boolean isValid(String stringToVerify) {
    if (stringToVerify == null || stringToVerify.isEmpty()) {
      return false;
    }

    int total = 0;
    int count = 0;
    int multiplier = 10;

    for (int i = 0; i < stringToVerify.length(); i++) {
      char c = stringToVerify.charAt(i);

      if (Character.isDigit(c)) {
        total += (c - '0') * multiplier;
        multiplier--;
        count++;
      } else if (c == 'X' && multiplier == 1) {
        total += 10;
        multiplier--;
        count++;
      } else if (c != '-') {
        return false;
      }

      if (multiplier < 1 && i < stringToVerify.length() - 1) {
        return false;
      }
    }

    return count == 10 && total % 11 == 0;
  }
}