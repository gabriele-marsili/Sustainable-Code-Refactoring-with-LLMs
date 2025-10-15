class IsbnVerifier {

  boolean isValid(String stringToVerify) {
    if (stringToVerify.isEmpty()) return false;

    var digits = stringToVerify.replaceAll("([^\\dX])", "").toCharArray();

    if (digits.length != 10) return false;

    var total = 0;
    for (int i = 0; i < digits.length; i++) {
      var digit = digits[i];
      total += (digit == 'X' && i == 9) ? 10 : (10 - i) * Character.getNumericValue(digit);
    }

    return total % 11 == 0;
  }
}
