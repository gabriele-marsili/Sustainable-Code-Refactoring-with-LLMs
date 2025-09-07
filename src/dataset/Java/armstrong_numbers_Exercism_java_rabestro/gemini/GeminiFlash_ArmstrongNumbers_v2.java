class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        int numDigits = digitCount(numberToCheck);
        int originalNumber = numberToCheck;
        int sum = 0;

        while (numberToCheck > 0) {
            int digit = numberToCheck % 10;
            sum += power(digit, numDigits);
            numberToCheck /= 10;
        }

        return sum == originalNumber;
    }

    private int digitCount(int numberToCheck) {
        if (numberToCheck == 0) {
            return 1;
        }
        int count = 0;
        int temp = numberToCheck;
        while (temp > 0) {
            temp /= 10;
            count++;
        }
        return count;
    }

    private int power(int base, int exponent) {
        int result = 1;
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }
}