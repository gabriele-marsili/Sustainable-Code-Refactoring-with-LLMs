class ArmstrongNumbers {

  private static int getLength(int num) {
    var len = 0;
    while (num > 0) {
      len++;
      num /= 10;
    }
    return len;
  }

  boolean isArmstrongNumber(final int numberToCheck) {
    var num = numberToCheck;
    var numLength = getLength(num);
    var total = 0;

    while (num > 0) {
      var remainder = num % 10;
      total += Math.pow(remainder, numLength);
      num /= 10;
    }
    return total == numberToCheck;
  }
}
