import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class PangramChecker {

    public boolean isPangram(String input) {
        // select an implementation
        return isPangram4(input);
    }

    enum Alphabet {
        A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
    }

    public boolean isPangram1(String input) {
        Set<Alphabet> missingLetters = EnumSet.allOf(Alphabet.class);
        for (String token : input.toUpperCase().split("")) {
            try {
                missingLetters.remove(Alphabet.valueOf(token));
            } catch (IllegalArgumentException ignored) {
            }
        }
        return missingLetters.isEmpty();
    }

    private final static int LETTERS_IN_ALPHABET = 26;

    public boolean isPangram2(String input) {
        return input.toUpperCase().chars()
                .filter(Character::isLetter)
                .distinct()
                .count() == LETTERS_IN_ALPHABET;
    }

    public boolean isPangram3(String input) {
        return Arrays.asList(input.toUpperCase().split(""))
                .containsAll(Arrays.asList("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")));
    }

    public boolean isPangram4(String input) {
        Set<Character> seen = new HashSet<>();
        input = input.toUpperCase();
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                seen.add(c);
            }
        }
        return seen.size() == 26;
    }
}