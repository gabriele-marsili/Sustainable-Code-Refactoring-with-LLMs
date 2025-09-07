class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        if (numberToCheck < 0) {
            return false;
        }

        int calculatedNumber = 0;
        int originalNumber = numberToCheck;
        int length = String.valueOf(numberToCheck).length();

        while (numberToCheck > 0) {
            int digit = numberToCheck % 10;
            calculatedNumber += Math.pow(digit, length);
            numberToCheck /= 10;
        }

        return originalNumber == calculatedNumber;
    }

}