import java.util.HashSet;
import java.util.Set;

public class PangramChecker {

    public boolean isPangram(String input) {
        return isPangramOptimized(input);
    }

    private final static int LETTERS_IN_ALPHABET = 26;

    public boolean isPangramOptimized(String input) {
        if (input == null || input.length() < LETTERS_IN_ALPHABET) {
            return false;
        }
        Set<Character> seenLetters = new HashSet<>();
        for (char c : input.toCharArray()) {
            if (Character.isLetter(c)) {
                seenLetters.add(Character.toUpperCase(c));
                if (seenLetters.size() == LETTERS_IN_ALPHABET) {
                    return true;
                }
            }
        }
        return false;
    }
}