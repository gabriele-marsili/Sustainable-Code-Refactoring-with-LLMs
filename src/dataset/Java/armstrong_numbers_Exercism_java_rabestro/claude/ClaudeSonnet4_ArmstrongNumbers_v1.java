class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        if (numberToCheck < 0) return false;
        if (numberToCheck < 10) return true;
        
        int original = numberToCheck;
        int digitCount = (int) Math.log10(numberToCheck) + 1;
        int sum = 0;
        
        while (numberToCheck > 0) {
            int digit = numberToCheck % 10;
            sum += Math.pow(digit, digitCount);
            numberToCheck /= 10;
        }
        
        return sum == original;
    }

    private int digitCount(int numberToCheck) {
        return numberToCheck == 0 ? 1 : (int) Math.log10(Math.abs(numberToCheck)) + 1;
    }
}