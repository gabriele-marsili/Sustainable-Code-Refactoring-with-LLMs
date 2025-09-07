class ArmstrongNumbers {

  private static int[] precomputePowers(int base, int maxPower) {
    int[] powers = new int[maxPower + 1];
    powers[0] = 1;
    for (int i = 1; i <= maxPower; i++) {
      powers[i] = powers[i - 1] * base;
    }
    return powers;
  }

  boolean isArmstrongNumber(final int numberToCheck) {
    int num = numberToCheck;
    int numLength = (int) Math.log10(num) + 1;
    int[] powers = precomputePowers(9, numLength); // Precompute powers for digits 0-9
    int total = 0;

    while (num > 0) {
      int remainder = num % 10;
      total += powers[remainder];
      if (total > numberToCheck) return false; // Early exit if total exceeds number
      num /= 10;
    }
    return total == numberToCheck;
  }
}