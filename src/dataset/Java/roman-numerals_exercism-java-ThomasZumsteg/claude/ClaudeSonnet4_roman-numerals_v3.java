public class RomanNumeral {
    private final int decimal;
    private static final String[] DIGITS = {
        "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"
    };
    private static final int[] VALUES = {
        1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1
    };

    public RomanNumeral(int decimal) {
        this.decimal = decimal;
    }

    public String getRomanNumeral() {
        if (decimal <= 0) return "";
        
        StringBuilder roman = new StringBuilder();
        int remain = decimal;
        
        for (int i = 0; i < VALUES.length; i++) {
            int count = remain / VALUES[i];
            if (count > 0) {
                remain -= count * VALUES[i];
                for (int j = 0; j < count; j++) {
                    roman.append(DIGITS[i]);
                }
            }
        }
        return roman.toString();
    }
}