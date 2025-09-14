public class Hexadecimal {
    private static final int[] HEX_VALUES = new int[128];
    
    static {
        for (int i = 0; i < HEX_VALUES.length; i++) {
            HEX_VALUES[i] = -1;
        }
        for (int i = 0; i <= 9; i++) {
            HEX_VALUES['0' + i] = i;
        }
        for (int i = 0; i <= 5; i++) {
            HEX_VALUES['a' + i] = 10 + i;
            HEX_VALUES['A' + i] = 10 + i;
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
            if (c >= 128) {
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