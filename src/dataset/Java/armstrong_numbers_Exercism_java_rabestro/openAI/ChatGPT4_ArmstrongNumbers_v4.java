class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        int pow = digitCount(numberToCheck);
        int sum = 0, temp = numberToCheck;
        while (temp > 0) {
            int digit = temp % 10;
            sum += fastPower(digit, pow);
            temp /= 10;
        }
        return sum == numberToCheck;
    }

    private int digitCount(int numberToCheck) {
        return (int) Math.log10(numberToCheck) + 1;
    }

    private int fastPower(int base, int exp) {
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