class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        if (numberToCheck < 0) return false;
        
        int original = numberToCheck;
        int calculatedNumber = 0;
        int length = getDigitCount(numberToCheck);
        
        while (numberToCheck > 0) {
            int digit = numberToCheck % 10;
            calculatedNumber += pow(digit, length);
            numberToCheck /= 10;
        }
        
        return original == calculatedNumber;
    }
    
    private int getDigitCount(int number) {
        if (number == 0) return 1;
        int count = 0;
        while (number > 0) {
            count++;
            number /= 10;
        }
        return count;
    }
    
    private int pow(int base, int exponent) {
        int result = 1;
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }
}