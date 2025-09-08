import java.util.Arrays;
import java.util.EnumSet;

public class PangramChecker {

    public boolean isPangram(String input) {
        // select an implementation
        return isPangram3(input);
    }

    // My initial solution
    enum Alphabet {
        A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
    }

    public boolean isPangram1(String input) {
        EnumSet<Alphabet> missingLetters = EnumSet.allOf(Alphabet.class);
        for (String token : input.toUpperCase().split("")) {
            try {
                missingLetters.remove(Alphabet.valueOf(token));
            } catch (IllegalArgumentException ignored) {
            }
        }
        return missingLetters.isEmpty();
    }

    // The first "Dig deeper" solution
    private final static int LETTERS_IN_ALPHABET = 26;

    public boolean isPangram2(String input) {
        return input.toUpperCase().chars()
                .filter(Character::isLetter)
                .distinct()
                .count() == LETTERS_IN_ALPHABET;
    }

    // The second "Dig deeper" solution - optimized
    public boolean isPangram3(String input) {
        boolean[] seen = new boolean[26];
        int count = 0;
        
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                int index = c - 'A';
                if (!seen[index]) {
                    seen[index] = true;
                    count++;
                    if (count == 26) return true;
                }
            } else if (c >= 'a' && c <= 'z') {
                int index = c - 'a';
                if (!seen[index]) {
                    seen[index] = true;
                    count++;
                    if (count == 26) return true;
                }
            }
        }
        
        return count == 26;
    }
}