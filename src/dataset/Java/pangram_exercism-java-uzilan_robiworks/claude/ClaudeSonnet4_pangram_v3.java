public class PangramChecker {

    public boolean isPangram(String input) {
        if (input == null || input.length() < 26) {
            return false;
        }
        
        int letterMask = 0;
        
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            int index = -1;
            
            if (c >= 'A' && c <= 'Z') {
                index = c - 'A';
            } else if (c >= 'a' && c <= 'z') {
                index = c - 'a';
            }
            
            if (index >= 0) {
                letterMask |= (1 << index);
                if (letterMask == 0x3FFFFFF) {
                    return true;
                }
            }
        }
        
        return letterMask == 0x3FFFFFF;
    }
}