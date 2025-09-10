public class Hexadecimal {
    public static int toDecimal(String hex) {
        int total = 0;
        for (int i = 0, len = hex.length(); i < len; i++) {
            char c = hex.charAt(i);
            if (c >= 'a' && c <= 'f') {
                total = (total << 4) + (c - 'a' + 10);
            } else if (c >= '0' && c <= '9') {
                total = (total << 4) + (c - '0');
            } else {
                return 0;
            }
        }
        return total;
    }
}