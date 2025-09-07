class ArmstrongNumbers {

  private static int getLength(int num) {
    if (num == 0) return 1;
    return (int) Math.log10(num) + 1;
  }

  boolean isArmstrongNumber(final int numberToCheck) {
    if (numberToCheck < 0) return false;
    if (numberToCheck < 10) return true;
    
    final int numLength = getLength(numberToCheck);
    int num = numberToCheck;
    int total = 0;

    while (num > 0) {
      final int remainder = num % 10;
      total += intPow(remainder, numLength);
      num /= 10;
    }
    return total == numberToCheck;
  }

  private static int intPow(int base, int exponent) {
    int result = 1;
    while (exponent > 0) {
      if ((exponent & 1) == 1) {
        result *= base;
      }
      base *= base;
      exponent >>= 1;
    }
    return result;
  }
}