public class RomanNumeral {
    private final int decimal;
    private static final String[] DIGITS = {
        "M", "CM", "D", "CD",
        "C", "XC", "L", "XL",
        "X", "IX", "V", "IV",
        "I"
    };
    private static final int[] VALUES = {
        1000, 900, 500, 400,
        100, 90, 50, 40,
        10, 9, 5, 4,
        1
    };

    public RomanNumeral(int decimal) {
        this.decimal = decimal;
    }

    public String getRomanNumeral() {
        StringBuilder roman = new StringBuilder();
        int remain = decimal;
        for (int i = 0; i < VALUES.length; i++) {
            while (remain >= VALUES[i]) {
                roman.append(DIGITS[i]);
                remain -= VALUES[i];
            }
        }
        return roman.toString();
    }
}