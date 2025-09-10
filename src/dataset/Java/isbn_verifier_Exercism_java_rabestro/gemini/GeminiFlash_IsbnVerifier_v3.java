class IsbnVerifier {

    boolean isValid(String stringToVerify) {
        String digits = stringToVerify.replace("-", "");

        if (digits.length() != 10) {
            return false;
        }

        int checkSum = 0;
        for (int i = 0; i < 9; i++) {
            char digitChar = digits.charAt(i);
            if (!Character.isDigit(digitChar)) {
                return false;
            }
            checkSum += (10 - i) * (digitChar - '0');
        }

        char lastChar = digits.charAt(9);
        if (Character.isDigit(lastChar)) {
            checkSum += (lastChar - '0');
        } else if (lastChar == 'X') {
            checkSum += 10;
        } else {
            return false;
        }

        return checkSum % 11 == 0;
    }
}