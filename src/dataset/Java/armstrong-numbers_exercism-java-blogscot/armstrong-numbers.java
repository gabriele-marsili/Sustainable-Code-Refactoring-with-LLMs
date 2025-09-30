class ArmstrongNumbers {

  private static int getLength(int num) {
    return (int) Math.log10(num) + 1;
  }

  boolean isArmstrongNumber(final int numberToCheck) {
    int num = numberToCheck;
    int numLength = getLength(num);
    int total = 0;

    while (num > 0) {
      int remainder = num % 10;
      int power = 1;
      for (int i = 0; i < numLength; i++) {
        power *= remainder;
      }
      total += power;
      num /= 10;
    }
    return total == numberToCheck;
  }
}