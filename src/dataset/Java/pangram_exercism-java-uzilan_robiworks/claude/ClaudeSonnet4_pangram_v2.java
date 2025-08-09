public class PangramChecker {

    public boolean isPangram(String input) {
        if (input.length() < 26) {
            return false;
        }
        
        int letterMask = 0;
        int targetMask = (1 << 26) - 1;
        
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
                if (letterMask == targetMask) {
                    return true;
                }
            }
        }
        
        return false;
    }
}