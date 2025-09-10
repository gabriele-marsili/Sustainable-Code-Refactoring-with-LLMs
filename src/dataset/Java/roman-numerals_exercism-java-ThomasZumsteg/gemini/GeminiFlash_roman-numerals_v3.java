public class RomanNumeral {
    private final int decimal;
    private static final String[] digits = {
        "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"
    };
    private static final int[] values = {
        1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1
    };

    public RomanNumeral(int decimal) {
        this.decimal = decimal;
    }

    public String getRomanNumeral() {
        int remain = decimal;
        StringBuilder roman = new StringBuilder();
        for (int i = 0; i < values.length; i++) {
            while (remain >= values[i]) {
                roman.append(digits[i]);
                remain -= values[i];
            }
        }
        return roman.toString();
    }
}