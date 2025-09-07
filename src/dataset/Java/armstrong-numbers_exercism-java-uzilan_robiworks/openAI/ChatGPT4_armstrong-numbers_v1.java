class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        int sum = 0, temp = numberToCheck, exp = (int) Math.log10(numberToCheck) + 1;
        while (temp > 0) {
            int digit = temp % 10;
            sum += fastPower(digit, exp);
            temp /= 10;
        }
        return sum == numberToCheck;
    }

    int fastPower(int base, int exp) {
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