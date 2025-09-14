class IsbnVerifier {

    boolean isValid(String stringToVerify) {
        int length = stringToVerify.length();
        int digitCount = 0;
        int checkSum = 0;
        
        for (int i = 0; i < length && digitCount < 10; i++) {
            char c = stringToVerify.charAt(i);
            
            if (c == '-') {
                continue;
            }
            
            if (digitCount == 9) {
                if (c == 'X') {
                    checkSum += 10;
                } else if (c >= '0' && c <= '9') {
                    checkSum += c - '0';
                } else {
                    return false;
                }
            } else if (c >= '0' && c <= '9') {
                checkSum += (10 - digitCount) * (c - '0');
            } else {
                return false;
            }
            
            digitCount++;
        }
        
        return digitCount == 10 && checkSum % 11 == 0;
    }
}