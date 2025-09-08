import java.util.Arrays;
import java.util.EnumSet;

public class PangramChecker {

    public boolean isPangram(String input) {
        return isPangram3(input);
    }

    enum Alphabet {
        A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
    }

    public boolean isPangram1(String input) {
        EnumSet<Alphabet> missingLetters = EnumSet.allOf(Alphabet.class);
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                missingLetters.remove(Alphabet.values()[c - 'A']);
            } else if (c >= 'a' && c <= 'z') {
                missingLetters.remove(Alphabet.values()[c - 'a']);
            }
            if (missingLetters.isEmpty()) {
                return true;
            }
        }
        return missingLetters.isEmpty();
    }

    private final static int LETTERS_IN_ALPHABET = 26;

    public boolean isPangram2(String input) {
        return input.chars()
                .filter(c -> (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'))
                .map(c -> c >= 'a' ? c - 'a' : c - 'A')
                .distinct()
                .count() == LETTERS_IN_ALPHABET;
    }

    public boolean isPangram3(String input) {
        boolean[] found = new boolean[26];
        int foundCount = 0;
        
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            int index = -1;
            
            if (c >= 'A' && c <= 'Z') {
                index = c - 'A';
            } else if (c >= 'a' && c <= 'z') {
                index = c - 'a';
            }
            
            if (index >= 0 && !found[index]) {
                found[index] = true;
                foundCount++;
                if (foundCount == 26) {
                    return true;
                }
            }
        }
        
        return foundCount == 26;
    }
}