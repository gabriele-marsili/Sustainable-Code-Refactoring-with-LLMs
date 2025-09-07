class ArmstrongNumbers {

  private static int getLength(int num) {
    if (num == 0) return 1;
    return (int) Math.log10(num) + 1;
  }

  boolean isArmstrongNumber(final int numberToCheck) {
    if (numberToCheck < 0) return false;
    if (numberToCheck < 10) return true;
    
    var num = numberToCheck;
    var numLength = getLength(num);
    var total = 0;

    while (num > 0) {
      var remainder = num % 10;
      var power = 1;
      for (int i = 0; i < numLength; i++) {
        power *= remainder;
      }
      total += power;
      num /= 10;
    }
    return total == numberToCheck;
  }
}