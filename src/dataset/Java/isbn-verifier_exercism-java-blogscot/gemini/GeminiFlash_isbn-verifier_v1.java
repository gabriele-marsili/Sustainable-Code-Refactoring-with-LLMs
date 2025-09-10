class IsbnVerifier {

  boolean isValid(String stringToVerify) {
    if (stringToVerify == null || stringToVerify.isEmpty()) return false;

    int total = 0;
    int count = 0;
    int position = 10;

    for (int i = 0; i < stringToVerify.length(); i++) {
      char c = stringToVerify.charAt(i);
      if (Character.isDigit(c)) {
        total += (c - '0') * position;
        position--;
        count++;
      } else if (c == 'X' && position == 1) {
        total += 10;
        count++;
        position--;
      } else if (c != '-') {
        return false;
      }
    }

    return count == 10 && total % 11 == 0;
  }
}