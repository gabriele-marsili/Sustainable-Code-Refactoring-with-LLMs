class LuhnValidator {

    boolean isValid(String candidate) {
        if (candidate == null) {
            return false;
        }
        
        int digitCount = 0;
        int sum = 0;
        boolean isEven = false;
        
        for (int i = candidate.length() - 1; i >= 0; i--) {
            char c = candidate.charAt(i);
            if (c == ' ') {
                continue;
            }
            if (c < '0' || c > '9') {
                return false;
            }
            
            digitCount++;
            int digit = c - '0';
            
            if (isEven) {
                digit <<= 1;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        
        return digitCount >= 2 && sum % 10 == 0;
    }
}