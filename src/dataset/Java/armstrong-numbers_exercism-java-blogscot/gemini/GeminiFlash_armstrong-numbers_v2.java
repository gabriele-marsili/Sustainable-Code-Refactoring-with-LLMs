class ArmstrongNumbers {

  private static int getLength(int num) {
    if (num == 0) {
      return 1;
    }
    int len = 0;
    while (num > 0) {
      len++;
      num /= 10;
    }
    return len;
  }

  private static int power(int base, int exponent) {
    int result = 1;
    for (int i = 0; i < exponent; i++) {
      result *= base;
    }
    return result;
  }

  boolean isArmstrongNumber(final int numberToCheck) {
    if (numberToCheck < 0) {
      return false;
    }

    int num = numberToCheck;
    int numLength = getLength(numberToCheck);
    int total = 0;

    while (num > 0) {
      int remainder = num % 10;
      total += power(remainder, numLength);
      if (total > numberToCheck) {
        return false;
      }
      num /= 10;
    }
    return total == numberToCheck;
  }
}