class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        if (numberToCheck < 0) {
            return false;
        }

        int num = numberToCheck;
        int length = 0;
        while (num > 0) {
            num /= 10;
            length++;
        }

        num = numberToCheck;
        int calculatedNumber = 0;
        while (num > 0) {
            int digit = num % 10;
            calculatedNumber += power(digit, length);
            num /= 10;
        }

        return numberToCheck == calculatedNumber;
    }

    private int power(int base, int exponent) {
        int result = 1;
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }
}