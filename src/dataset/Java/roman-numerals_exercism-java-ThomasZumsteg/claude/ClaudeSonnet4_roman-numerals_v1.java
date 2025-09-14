public class RomanNumeral {
    private final int decimal;
    private static final String[] DIGITS = {
        "I", "IV", "V", "IX",
        "X", "XL", "L", "XC",
        "C", "CD", "D", "CM",
        "M",
    };
    private static final int[] VALUES = {
           1,   4,   5,   9,
          10,  40,  50,  90,
         100, 400, 500, 900,
        1000,
    };

    public RomanNumeral(int decimal) {
        this.decimal = decimal;
    }

    public String getRomanNumeral() {
        if (decimal <= 0) return "";
        
        StringBuilder roman = new StringBuilder();
        int remain = decimal;
        
        for (int i = VALUES.length - 1; i >= 0; i--) {
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