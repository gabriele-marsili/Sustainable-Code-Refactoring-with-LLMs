class LuhnValidator {

    boolean isValid(String candidate) {
        int digitCount = 0, sum = 0;
        for (int i = candidate.length() - 1, parity = 0; i >= 0; i--) {
            char c = candidate.charAt(i);
            if (c >= '0' && c <= '9') {
                int digit = c - '0';
                if ((parity++ & 1) == 1) {
                    digit = (digit > 4) ? digit * 2 - 9 : digit * 2;
                }
                sum += digit;
                digitCount++;
            } else if (c != ' ') {
                return false;
            }
        }
        return digitCount > 1 && sum % 10 == 0;
    }
}