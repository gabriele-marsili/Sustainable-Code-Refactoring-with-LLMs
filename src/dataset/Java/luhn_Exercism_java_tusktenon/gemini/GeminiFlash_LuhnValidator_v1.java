class LuhnValidator {

    boolean isValid(String candidate) {
        int digitCount = 0;
        int sum = 0;
        for (int i = candidate.length() - 1; i >= 0; i--) {
            char c = candidate.charAt(i);
            if (c >= '0' && c <= '9') {
                int digit = c - '0';
                if ((++digitCount & 1) == 0) { // Optimized count % 2
                    digit <<= 1; // Optimized digit *= 2
                    if (digit > 9) {
                        digit -= 9;
                    }
                }
                sum += digit;
            } else if (c == ' ') {
                continue;
            } else {
                return false;
            }
        }
        return digitCount > 1 && sum % 10 == 0;
    }
}