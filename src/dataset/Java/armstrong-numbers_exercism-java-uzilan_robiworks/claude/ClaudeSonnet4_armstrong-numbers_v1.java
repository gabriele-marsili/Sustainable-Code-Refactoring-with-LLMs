class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        if (numberToCheck < 0) return false;
        if (numberToCheck < 10) return true;
        
        int temp = numberToCheck;
        int exp = 0;
        
        // Count digits without string conversion
        while (temp > 0) {
            exp++;
            temp /= 10;
        }
        
        temp = numberToCheck;
        int sum = 0;
        
        // Extract digits and calculate sum in one pass
        while (temp > 0) {
            int digit = temp % 10;
            sum += Power(digit, exp);
            temp /= 10;
        }
        
        return sum == numberToCheck;
    }

    int Power(int number, int exponent) {
        if (exponent == 0) return 1;
        if (exponent == 1) return number;
        
        int output = 1;
        for (int i = 0; i < exponent; i++) {
            output *= number;
        }
        return output;
    }
}