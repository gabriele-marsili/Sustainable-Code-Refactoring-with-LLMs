class LuhnValidator {

    boolean isValid(String candidate) {
        if (candidate == null || candidate.length() < 2) {
            return false;
        }
        
        int digitCount = 0;
        int sum = 0;
        boolean isEven = false;
        
        for (int i = candidate.length() - 1; i >= 0; i--) {
            char c = candidate.charAt(i);
            if (c >= '0' && c <= '9') {
                int digit = c - '0';
                if (isEven) {
                    digit <<= 1; // multiply by 2
                    if (digit > 9) {
                        digit -= 9;
                    }
                }
                sum += digit;
                digitCount++;
                isEven = !isEven;
            } else if (c != ' ') {
                return false;
            }
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