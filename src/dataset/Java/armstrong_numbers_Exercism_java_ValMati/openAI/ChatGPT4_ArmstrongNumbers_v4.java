class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        int calculatedNumber = 0;
        int originalNumber = numberToCheck;
        int length = (int) Math.log10(numberToCheck) + 1;

        while (numberToCheck > 0) {
            int digit = numberToCheck % 10;
            calculatedNumber += fastPower(digit, length);
            numberToCheck /= 10;
        }

        return originalNumber == calculatedNumber;
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