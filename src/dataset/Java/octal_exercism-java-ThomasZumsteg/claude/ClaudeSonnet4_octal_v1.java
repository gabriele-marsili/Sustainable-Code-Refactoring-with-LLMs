public class Octal {
    private final String octal;

    public Octal(String octal) {
        this.octal = octal;
    }

    public long getDecimal() {
        if (octal == null || octal.isEmpty()) {
            return 0L;
        }
        
        long decimal = 0L;
        int length = octal.length();
        
        for (int i = 0; i < length; i++) {
            char c = octal.charAt(i);
            if (c < '0' || c > '7') {
                return 0L;
            }
            decimal = (decimal << 3) + (c - '0');
        }
        return decimal;
    }
}