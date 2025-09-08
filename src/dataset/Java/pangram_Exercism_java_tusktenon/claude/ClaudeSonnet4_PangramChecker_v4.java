import java.util.Arrays;
import java.util.EnumSet;

public class PangramChecker {

    private static final boolean[] ALPHABET_PRESENT = new boolean[26];
    private static final int LETTERS_IN_ALPHABET = 26;

    public boolean isPangram(String input) {
        return isPangram3(input);
    }

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

    public boolean isPangram2(String input) {
        return input.toUpperCase().chars()
                .filter(Character::isLetter)
                .distinct()
                .count() == LETTERS_IN_ALPHABET;
    }

    public boolean isPangram3(String input) {
        Arrays.fill(ALPHABET_PRESENT, false);
        int foundLetters = 0;
        
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                int index = c - 'A';
                if (!ALPHABET_PRESENT[index]) {
                    ALPHABET_PRESENT[index] = true;
                    foundLetters++;
                    if (foundLetters == LETTERS_IN_ALPHABET) {
                        return true;
                    }
                }
            } else if (c >= 'a' && c <= 'z') {
                int index = c - 'a';
                if (!ALPHABET_PRESENT[index]) {
                    ALPHABET_PRESENT[index] = true;
                    foundLetters++;
                    if (foundLetters == LETTERS_IN_ALPHABET) {
                        return true;
                    }
                }
            }
        }
        
        return foundLetters == LETTERS_IN_ALPHABET;
    }
}