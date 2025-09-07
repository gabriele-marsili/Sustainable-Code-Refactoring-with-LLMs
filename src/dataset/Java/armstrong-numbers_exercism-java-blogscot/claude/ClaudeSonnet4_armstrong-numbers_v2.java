class ArmstrongNumbers {

  boolean isArmstrongNumber(final int numberToCheck) {
    if (numberToCheck < 0) return false;
    if (numberToCheck < 10) return true;
    
    var num = numberToCheck;
    var numLength = (int) Math.log10(numberToCheck) + 1;
    var total = 0;

    while (num > 0) {
      var remainder = num % 10;
      total += pow(remainder, numLength);
      num /= 10;
    }
    return total == numberToCheck;
  }
  
  private static int pow(int base, int exp) {
    int result = 1;
    while (exp > 0) {
      if ((exp & 1) == 1) {
        result *= base;
      }
      base *= base;
      exp >>= 1;
    }
    return result;
  }
}