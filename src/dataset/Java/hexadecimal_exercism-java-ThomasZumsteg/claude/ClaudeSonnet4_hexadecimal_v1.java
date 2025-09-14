public class Hexadecimal {
    public static int toDecimal(String hex) {
        /* toDecimal coverts a hexadecimal number into decimal 
         * valid characers are a-f0-9
         * numbers with an invalid character are 0*/
        if (hex == null || hex.isEmpty()) {
            return 0;
        }
        
        int total = 0;
        int length = hex.length();
        
        for (int i = 0; i < length; i++) {
            char c = hex.charAt(i);
            total <<= 4; // Equivalent to total *= 16 but faster
            
            if (c >= '0' && c <= '9') {
                total += c - '0';
            } else if (c >= 'a' && c <= 'f') {
                total += c - 'a' + 10;
            } else if (c >= 'A' && c <= 'F') {
                total += c - 'A' + 10;
            } else {
                // Invalid character
                return 0;
            }
        }
        return total;
    }
}