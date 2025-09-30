public class Binary {
    private final String binary;
    private int cachedDecimal = -1;

    public Binary(String binary) {
        this.binary = binary;
    }

    public int getDecimal() {
        if (cachedDecimal != -1) {
            return cachedDecimal;
        }

        int result = 0;
        int length = binary.length();
        
        for (int i = 0; i < length; i++) {
            char c = binary.charAt(i);
            if (c != '0' && c != '1') {
                cachedDecimal = 0;
                return 0;
            }
            result = (result << 1) + (c - '0');
        }
        
        cachedDecimal = result;
        return result;
    }
}