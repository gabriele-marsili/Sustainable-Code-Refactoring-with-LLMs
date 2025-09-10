public class RomanNumeral {
    private final int decimal;
    private static final String[] DIGITS = {
        "I", "IV", "V", "IX",
        "X", "XL", "L", "XC",
        "C", "CD", "D", "CM",
        "M"
    };
    private static final int[] VALUES = {
           1,   4,   5,   9,
          10,  40,  50,  90,
         100, 400, 500, 900,
        1000
    };

    public RomanNumeral(int decimal) {
        this.decimal = decimal;
    }

    public String getRomanNumeral() {
        StringBuilder roman = new StringBuilder();
        int remain = decimal;
        for (int i = VALUES.length - 1; i >= 0 && remain > 0; i--) {
            while (remain >= VALUES[i]) {
                roman.append(DIGITS[i]);
                remain -= VALUES[i];
            }
        }
        return roman.toString();
    }
}