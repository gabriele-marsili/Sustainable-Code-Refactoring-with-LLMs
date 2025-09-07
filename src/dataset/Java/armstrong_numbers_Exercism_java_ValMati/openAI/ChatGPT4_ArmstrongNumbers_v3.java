class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        int calculatedNumber = 0, temp = numberToCheck, length = (int) Math.log10(numberToCheck) + 1;

        while (temp > 0) {
            int digit = temp % 10;
            calculatedNumber += Math.pow(digit, length);
            temp /= 10;
        }

        return numberToCheck == calculatedNumber;
    }

}