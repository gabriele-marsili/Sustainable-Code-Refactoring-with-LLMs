class ArmstrongNumbers {

  private static int getLength(int num) {
    if (num == 0) {
      return 1;
    }
    return (int) Math.log10(num) + 1;
  }

  boolean isArmstrongNumber(final int numberToCheck) {
    if (numberToCheck < 0) {
      return false;
    }

    int num = numberToCheck;
    int numLength = getLength(numberToCheck);
    int total = 0;
    int originalNum = numberToCheck;

    while (num > 0) {
      int remainder = num % 10;
      int power = 1;
      for (int i = 0; i < numLength; i++) {
        power *= remainder;
      }
      if (total > Integer.MAX_VALUE - power) {
        return false;
      }
      total += power;
      num /= 10;
    }

    return total == originalNum;
  }
}