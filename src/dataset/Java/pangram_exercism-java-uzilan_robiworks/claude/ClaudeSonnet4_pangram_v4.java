public class PangramChecker {

    public boolean isPangram(String input) {
        if (input == null || input.length() < 26) {
            return false;
        }
        
        int letterMask = 0;
        final int allLetters = (1 << 26) - 1;
        
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            int letterIndex = -1;
            
            if (c >= 'A' && c <= 'Z') {
                letterIndex = c - 'A';
            } else if (c >= 'a' && c <= 'z') {
                letterIndex = c - 'a';
            }
            
            if (letterIndex >= 0) {
                letterMask |= (1 << letterIndex);
                if (letterMask == allLetters) {
                    return true;
                }
            }
        }
        
        return letterMask == allLetters;
    }
}