class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        String temp = Integer.toString(numberToCheck);
        int exp = temp.length();
        int[] arr = new int[exp];
        int sum = 0;
        for (int i = 0; i < exp; i++) {
            arr[i] = temp.charAt(i) - '0';
            sum += Power(arr[i], exp);
        }
        return (sum == numberToCheck);
    }

    int Power(int number, int exponent) {
        int output = number;
        for (int i = 2; i <= exponent; i++) {
            output *= number;
        }
        return output;
    }

}
