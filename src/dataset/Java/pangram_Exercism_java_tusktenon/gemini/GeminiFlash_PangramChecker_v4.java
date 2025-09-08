import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class PangramChecker {

    public boolean isPangram(String input) {
        // select an implementation
        return isPangramOptimized(input);
    }

    public boolean isPangram1(String input) {
        return isPangramOptimized(input);
    }

    private final static int LETTERS_IN_ALPHABET = 26;

    public boolean isPangram2(String input) {
        return isPangramOptimized(input);
    }

    public boolean isPangram3(String input) {
        return isPangramOptimized(input);
    }

    public boolean isPangramOptimized(String input) {
        if (input == null || input.isEmpty()) {
            return false;
        }

        Set<Character> seen = new HashSet<>();
        input = input.toUpperCase();

        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                seen.add(c);
            }
        }

        return seen.size() == LETTERS_IN_ALPHABET;
    }
}