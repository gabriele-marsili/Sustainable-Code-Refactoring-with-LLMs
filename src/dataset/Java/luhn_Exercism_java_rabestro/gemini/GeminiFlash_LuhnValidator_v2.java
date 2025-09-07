class LuhnValidator {

    boolean isValid(String candidate) {
        String number = candidate.replaceAll(" ", "");
        int len = number.length();

        if (len < 2) {
            return false;
        }

        for (int i = 0; i < len; i++) {
            if (!Character.isDigit(number.charAt(i))) {
                return false;
            }
        }

        int sum = 0;
        boolean isEven = len % 2 == 0;

        for (int i = 0; i < len; i++) {
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