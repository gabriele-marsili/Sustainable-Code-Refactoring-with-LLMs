class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        if (numberToCheck < 0) {
            return false;
        }

        int num = numberToCheck;
        int sum = 0;
        int exp = String.valueOf(numberToCheck).length();

        while (num > 0) {
            int digit = num % 10;
            sum += power(digit, exp);
            if (sum > numberToCheck) {
                return false;
            }
            num /= 10;
        }

        return sum == numberToCheck;
    }

    private int power(int base, int exponent) {
        if (exponent == 0) {
            return 1;
        }
        if (exponent == 1) {
            return base;
        }

        int result = 1;
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }
}