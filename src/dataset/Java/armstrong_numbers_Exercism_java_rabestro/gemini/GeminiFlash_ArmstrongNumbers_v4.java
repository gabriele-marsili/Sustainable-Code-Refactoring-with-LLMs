class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        int num = numberToCheck;
        int pow = digitCount(num);
        int sum = 0;
        while (num > 0) {
            int digit = num % 10;
            sum += power(digit, pow);
            num /= 10;
        }
        return sum == numberToCheck;
    }

    private int digitCount(int numberToCheck) {
        int count = 0;
        int num = numberToCheck;
        while (num != 0) {
            num /= 10;
            count++;
        }
        return count == 0 ? 1 : count;
    }

    private int power(int base, int exponent) {
        int result = 1;
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }
}