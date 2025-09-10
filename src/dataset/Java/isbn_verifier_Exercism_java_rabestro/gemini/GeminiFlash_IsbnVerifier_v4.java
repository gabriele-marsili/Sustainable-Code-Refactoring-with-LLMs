class IsbnVerifier {

    boolean isValid(String stringToVerify) {
        String digits = stringToVerify.replace("-", "");

        if (digits.length() != 10) {
            return false;
        }

        int checkSum = 0;
        for (int i = 0; i < 9; i++) {
            char c = digits.charAt(i);
            if (!Character.isDigit(c)) {
                return false;
            }
            checkSum += (10 - i) * (c - '0');
        }

        char lastChar = digits.charAt(9);
        if (lastChar == 'X') {
            checkSum += 10;
        } else if (Character.isDigit(lastChar)) {
            checkSum += (lastChar - '0');
        } else {
            return false;
        }

        return checkSum % 11 == 0;
    }
}