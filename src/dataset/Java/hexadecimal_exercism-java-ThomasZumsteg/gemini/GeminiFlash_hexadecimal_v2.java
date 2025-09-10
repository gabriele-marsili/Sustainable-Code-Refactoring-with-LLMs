public class Hexadecimal {
    public static int toDecimal(String hex) {
        int total = 0;
        int len = hex.length();
        for (int i = 0; i < len; i++) {
            char c = hex.charAt(i);
            int digit;
            if (c >= '0' && c <= '9') {
                digit = c - '0';
            } else if (c >= 'a' && c <= 'f') {
                digit = c - 'a' + 10;
            } else if (c >= 'A' && c <= 'F') {
                digit = c - 'A' + 10;
            } else {
                return 0;
            }
            total = (total << 4) | digit;
        }
        return total;
    }
}