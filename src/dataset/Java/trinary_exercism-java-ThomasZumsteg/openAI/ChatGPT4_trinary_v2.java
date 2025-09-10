public class Trinary {
    public static int toDecimal(String trinary) {
        int decimal = 0;
        for (int i = 0, len = trinary.length(); i < len; i++) {
            char c = trinary.charAt(i);
            if (c < '0' || c > '2') {
                return 0;
            }
            decimal = decimal * 3 + (c - '0');
        }
        return decimal;
    }
}