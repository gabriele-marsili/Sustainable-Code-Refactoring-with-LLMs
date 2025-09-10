import static java.lang.Character.getNumericValue;

class IsbnVerifier {

    boolean isValid(String stringToVerify) {
        if (stringToVerify == null || stringToVerify.isEmpty()) {
            return false;
        }

        String digits = stringToVerify.replace("-", "");
        if (digits.length() != 10 || !digits.matches("\\d{9}[X\\d]")) {
            return false;
        }

        int checkSum = 0;
        for (int i = 0; i < 9; i++) {
            checkSum += (10 - i) * getNumericValue(digits.charAt(i));
        }
        checkSum += digits.charAt(9) == 'X' ? 10 : getNumericValue(digits.charAt(9));

        return checkSum % 11 == 0;
    }

}