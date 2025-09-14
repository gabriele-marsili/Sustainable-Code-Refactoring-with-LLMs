class IsbnVerifier {

    boolean isValid(String stringToVerify) {
        if (stringToVerify == null) {
            return false;
        }
        
        int digitCount = 0;
        int checkSum = 0;
        
        for (int i = 0; i < stringToVerify.length(); i++) {
            char c = stringToVerify.charAt(i);
            
            if (c == '-') {
                continue;
            }
            
            if (digitCount == 10) {
                return false;
            }
            
            if (digitCount == 9) {
                if (c == 'X') {
                    checkSum += 10;
                } else if (c >= '0' && c <= '9') {
                    checkSum += c - '0';
                } else {
                    return false;
                }
                digitCount++;
            } else if (c >= '0' && c <= '9') {
                checkSum += (10 - digitCount) * (c - '0');
                digitCount++;
            } else {
                return false;
            }
        }
        
        return digitCount == 10 && checkSum % 11 == 0;
    }
}