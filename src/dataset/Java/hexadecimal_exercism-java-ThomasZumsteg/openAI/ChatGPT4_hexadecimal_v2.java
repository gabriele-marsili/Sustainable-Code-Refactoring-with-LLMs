public class Hexadecimal {
    public static int toDecimal(String hex) {
        int total = 0;
        for (int i = 0, len = hex.length(); i < len; i++) {
            char c = hex.charAt(i);
            if ('a' <= c && c <= 'f') {
                total = (total << 4) + (c - 'a' + 10); // Multiply by 16 using bit shift
            } else if ('0' <= c && c <= '9') {
                total = (total << 4) + (c - '0'); // Multiply by 16 using bit shift
            } else {
                return 0; // Invalid character
            }
        }
        return total;
    }
}