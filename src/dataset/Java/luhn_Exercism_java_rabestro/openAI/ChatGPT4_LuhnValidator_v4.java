class LuhnValidator {

    boolean isValid(String candidate) {
        String number = candidate.replace(" ", "");
        int length = number.length();
        if (length < 2 || !number.chars().allMatch(Character::isDigit)) {
            return false;
        }
        int sum = 0;
        boolean doubleDigit = (length % 2 == 0);
        for (int i = 0; i < length; i++) {
            int digit = number.charAt(i) - '0';
            if (doubleDigit) {
                digit = (digit > 4) ? (digit * 2 - 9) : (digit * 2);
            }
            sum += digit;
            doubleDigit = !doubleDigit;
        }
        return sum % 10 == 0;
    }
}