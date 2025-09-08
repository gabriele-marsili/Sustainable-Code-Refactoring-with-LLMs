import java.util.BitSet;

class IsogramChecker {

    boolean isIsogram(String phrase) {
        BitSet seen = new BitSet(128);
        
        for (int i = 0; i < phrase.length(); i++) {
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