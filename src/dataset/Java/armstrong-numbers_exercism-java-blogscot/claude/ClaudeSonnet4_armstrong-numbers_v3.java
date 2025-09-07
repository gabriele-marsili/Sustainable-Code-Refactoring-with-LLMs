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
    long total = 0;
    
    while (num > 0) {
      final int remainder = num % 10;
      total += pow(remainder, numLength);
      if (total > numberToCheck) return false;
      num /= 10;
    }
    return total == numberToCheck;
  }
  
  private static long pow(int base, int exponent) {
    long result = 1;
    for (int i = 0; i < exponent; i++) {
      result *= base;
    }
    return result;
  }
}