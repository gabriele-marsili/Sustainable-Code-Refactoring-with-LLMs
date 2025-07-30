class LuhnValidator {

    boolean isValid(String candidate) {
        int digitCount = 0;
        int sum = 0;
        for (int i = candidate.length() - 1; i >= 0; i--) {
            int c = candidate.codePointAt(i);
            if (Character.isDigit(c))
                sum += luhnAdjustment(c - '0', ++digitCount);
            else if (c == ' ')
                continue;
            else
                return false;
        }
        return digitCount > 1 && sum % 10 == 0;
    }

    private int luhnAdjustment(int digit, int count) {
        if (count % 2 == 0) {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        return digit;
    }
}
