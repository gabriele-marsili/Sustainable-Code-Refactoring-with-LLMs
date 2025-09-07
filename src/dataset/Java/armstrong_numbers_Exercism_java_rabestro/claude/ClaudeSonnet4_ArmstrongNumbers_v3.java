class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        if (numberToCheck < 0) return false;
        if (numberToCheck < 10) return true;
        
        int original = numberToCheck;
        int pow = digitCount(numberToCheck);
        int sum = 0;
        
        while (numberToCheck > 0) {
            int digit = numberToCheck % 10;
            sum += Math.pow(digit, pow);
            numberToCheck /= 10;
        }
        
        return sum == original;
    }

    private int digitCount(int numberToCheck) {
        return (int) Math.log10(numberToCheck) + 1;
    }
}