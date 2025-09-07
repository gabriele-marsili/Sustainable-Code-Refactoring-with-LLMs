class LuhnValidator {

    boolean isValid(String candidate) {
        String number = candidate.replaceAll(" ", "");
        int length = number.length();

        if (length < 2) {
            return false;
        }

        for (int i = 0; i < length; i++) {
            if (!Character.isDigit(number.charAt(i))) {
                return false;
            }
        }

        int sum = 0;
        boolean isEven = length % 2 == 0;

        for (int i = 0; i < length; i++) {
            int digit = number.charAt(i) - '0';

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 == 0;
    }
}