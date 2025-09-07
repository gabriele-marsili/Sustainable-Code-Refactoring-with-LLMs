class LuhnValidator {

    boolean isValid(String candidate) {
        int digitCount = 0;
        int sum = 0;
        boolean isSecond = false;

        for (int i = candidate.length() - 1; i >= 0; i--) {
            char c = candidate.charAt(i);
            if (c >= '0' && c <= '9') {
                int digit = c - '0';
                if (isSecond) {
                    digit *= 2;
                    if (digit > 9) digit -= 9;
                }
                sum += digit;
                digitCount++;
                isSecond = !isSecond;
            } else if (c != ' ') {
                return false;
            }
        }
        return digitCount > 1 && sum % 10 == 0;
    }
}