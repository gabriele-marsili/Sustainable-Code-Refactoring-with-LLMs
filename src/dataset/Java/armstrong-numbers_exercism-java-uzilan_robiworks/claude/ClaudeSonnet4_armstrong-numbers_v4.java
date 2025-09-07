class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        if (numberToCheck < 0) return false;
        if (numberToCheck < 10) return true;
        
        int temp = numberToCheck;
        int digitCount = 0;
        while (temp > 0) {
            digitCount++;
            temp /= 10;
        }
        
        temp = numberToCheck;
        int sum = 0;
        while (temp > 0) {
            int digit = temp % 10;
            sum += Power(digit, digitCount);
            temp /= 10;
        }
        
        return sum == numberToCheck;
    }

    int Power(int number, int exponent) {
        if (exponent == 0) return 1;
        if (exponent == 1) return number;
        
        int result = 1;
        while (exponent > 0) {
            if ((exponent & 1) == 1) {
                result *= number;
            }
            number *= number;
            exponent >>= 1;
        }
        return result;
    }
}