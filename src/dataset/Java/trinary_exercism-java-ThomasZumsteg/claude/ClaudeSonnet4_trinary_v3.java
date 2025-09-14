public class Trinary {
    public static int toDecimal(String trinary) {
        if (trinary == null || trinary.isEmpty()) {
            return 0;
        }
        
        int decimal = 0;
        int length = trinary.length();
        
        for (int i = 0; i < length; i++) {
            char c = trinary.charAt(i);
            if (c < '0' || c > '2') {
                return 0;
            }
            decimal = decimal * 3 + (c - '0');
        }
        
        return decimal;
    }
}