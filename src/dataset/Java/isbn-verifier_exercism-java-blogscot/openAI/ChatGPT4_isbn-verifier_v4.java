class IsbnVerifier {

  boolean isValid(String stringToVerify) {
    if (stringToVerify == null || stringToVerify.length() != 13) return false;

    int total = 0, weight = 10, digit;
    for (int i = 0, len = stringToVerify.length(); i < len; i++) {
      char ch = stringToVerify.charAt(i);
      if (ch == '-') continue;
      if (ch == 'X' && weight == 1) digit = 10;
      else if (Character.isDigit(ch)) digit = ch - '0';
      else return false;
      total += digit * weight--;
    }
    return weight == 0 && total % 11 == 0;
  }
}