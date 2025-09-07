class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        int sum = 0, temp = numberToCheck, exp = (int) Math.log10(numberToCheck) + 1;
        while (temp > 0) {
            int digit = temp % 10;
            sum += Math.pow(digit, exp);
            temp /= 10;
        }
        return sum == numberToCheck;
    }

    int Power(int number, int exponent) {
        return (int) Math.pow(number, exponent);
    }

}