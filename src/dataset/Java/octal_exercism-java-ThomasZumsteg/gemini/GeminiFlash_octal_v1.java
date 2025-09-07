public class Octal {
    private final String octal;

    public Octal(String octal) {
        this.octal = octal;
    }

    public long getDecimal() {
        long decimal = 0;
        int len = octal.length();
        for (int i = 0; i < len; i++) {
            char c = octal.charAt(i);
            if (c < '0' || c > '7') {
                return 0;
            }
            decimal = (decimal << 3) + (c - '0');
        }
        return decimal;
    }
}