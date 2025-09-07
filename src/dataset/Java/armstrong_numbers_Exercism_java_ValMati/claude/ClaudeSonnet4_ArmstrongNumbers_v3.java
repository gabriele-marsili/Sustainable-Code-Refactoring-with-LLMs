class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        if (numberToCheck < 0) return false;
        if (numberToCheck < 10) return true;
        
        int original = numberToCheck;
        int digitCount = 0;
        int temp = numberToCheck;
        
        while (temp > 0) {
            digitCount++;
            temp /= 10;
        }
        
        int calculatedNumber = 0;
        temp = numberToCheck;
        
        while (temp > 0) {
            int digit = temp % 10;
            calculatedNumber += pow(digit, digitCount);
            temp /= 10;
        }
        
        return original == calculatedNumber;
    }
    
    private int pow(int base, int exponent) {
        int result = 1;
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }
}