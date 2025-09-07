class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        int calculatedNumber = 0;
        int originalNumber = numberToCheck;
        int length = (int) Math.log10(numberToCheck) + 1;

        while (numberToCheck > 0) {
            int digit = numberToCheck % 10;
            calculatedNumber += power(digit, length);
            numberToCheck /= 10;
        }

        return originalNumber == calculatedNumber;
    }

    private int power(int base, int exp) {
        int result = 1;
        for (int i = 0; i < exp; i++) {
            result *= base;
        }
        return result;
    }

}