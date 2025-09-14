public class Hexadecimal {
    private static final int[] HEX_VALUES = new int[256];
    
    static {
        for (int i = 0; i < 256; i++) {
            HEX_VALUES[i] = -1;
        }
        for (int i = '0'; i <= '9'; i++) {
            HEX_VALUES[i] = i - '0';
        }
        for (int i = 'a'; i <= 'f'; i++) {
            HEX_VALUES[i] = i - 'a' + 10;
        }
        for (int i = 'A'; i <= 'F'; i++) {
            HEX_VALUES[i] = i - 'A' + 10;
        }
    }
    
    public static int toDecimal(String hex) {
        if (hex == null || hex.isEmpty()) {
            return 0;
        }
        
        int total = 0;
        int length = hex.length();
        
        for (int i = 0; i < length; i++) {
            char c = hex.charAt(i);
            if (c >= 256) {
                return 0;
            }
            
            int value = HEX_VALUES[c];
            if (value == -1) {
                return 0;
            }
            
            total = (total << 4) + value;
        }
        
        return total;
    }
}