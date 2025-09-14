public class Binary {
    private final String binary; 

    public Binary(String binary) {
        this.binary = binary;
    }

    public int getDecimal() {
        int result = 0;
        int length = binary.length();
        
        for(int i = 0; i < length; i++) {
            char c = binary.charAt(i);
            if(c != '0' && c != '1')
                return 0;
            result = (result << 1) + (c - '0');
        }
        return result;
    }
}