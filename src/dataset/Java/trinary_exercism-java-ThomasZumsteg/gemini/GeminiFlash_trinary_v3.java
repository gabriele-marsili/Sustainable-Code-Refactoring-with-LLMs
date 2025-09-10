public class Trinary {
    public static int toDecimal(String trinary) {
        int decimal = 0;
        int len = trinary.length();
        for (int i = 0; i < len; i++) {
            char c = trinary.charAt(i);
            if (c >= '0' && c <= '2') {
                decimal = decimal * 3 + (c - '0');
            } else {
                return 0;
            }
        }
        return decimal;
    }
}