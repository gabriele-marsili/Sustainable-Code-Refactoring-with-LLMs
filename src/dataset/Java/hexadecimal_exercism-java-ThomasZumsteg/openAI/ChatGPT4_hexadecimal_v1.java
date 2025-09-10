public class Hexadecimal {
    public static int toDecimal(String hex) {
        int total = 0;
        int length = hex.length();
        for (int i = 0; i < length; i++) {
            char c = hex.charAt(i);
            if ('0' <= c && c <= '9') {
                total = (total << 4) + (c - '0');
            } else if ('a' <= c && c <= 'f') {
                total = (total << 4) + (c - 'a' + 10);
            } else {
                return 0; // Invalid character
            }
        }
        return total;
    }
}