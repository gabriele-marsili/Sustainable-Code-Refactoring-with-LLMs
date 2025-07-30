class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        int calculatedNumber = 0;

        String numberAsString = String.valueOf(numberToCheck);
        int length = numberAsString.length();
        for (char number : numberAsString.toCharArray()) {
            calculatedNumber += (int) Math.pow(number - '0', length);
        }

        return numberToCheck == calculatedNumber;
    }

}
