import java.util.BitSet;

class IsogramChecker {

    boolean isIsogram(String phrase) {
        if (phrase == null || phrase.isEmpty()) {
            return true;
        }
        
        BitSet seen = new BitSet(128);
        int length = phrase.length();
        
        for (int i = 0; i < length; i++) {
            char c = phrase.charAt(i);
            if (c == ' ' || c == '-') {
                continue;
            }
            
            if (c >= 'A' && c <= 'Z') {
                c = (char) (c + 32);
            }
            
            if (seen.get(c)) {
                return false;
            }
            seen.set(c);
        }
        
        return true;
    }
}