import java.util.HashSet;
import java.util.Set;

public class PangramChecker {

    public boolean isPangram(String input) {
        // select an implementation
        return isPangram3(input);
    }

    // Optimized solution
    public boolean isPangram1(String input) {
        Set<Character> missingLetters = new HashSet<>();
        for (char c = 'A'; c <= 'Z'; c++) {
            missingLetters.add(c);
        }
        for (char c : input.toUpperCase().toCharArray()) {
            missingLetters.remove(c);
            if (missingLetters.isEmpty()) {
                return true;
            }
        }
        return false;
    }

    public boolean isPangram2(String input) {
        int seen = 0;
        for (char c : input.toUpperCase().toCharArray()) {
            if (Character.isLetter(c)) {
                seen |= 1 << (c - 'A');
                if (seen == (1 << 26) - 1) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean isPangram3(String input) {
        boolean[] seen = new boolean[26];
        int count = 0;
        for (char c : input.toUpperCase().toCharArray()) {
            if (c >= 'A' && c <= 'Z') {
                int index = c - 'A';
                if (!seen[index]) {
                    seen[index] = true;
                    count++;
                    if (count == 26) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}